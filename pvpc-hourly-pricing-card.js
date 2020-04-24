const LitElement = Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const tariffPeriodIcons = {
  peak: 'mdi:weather-sunny',
  valley: 'mdi:weather-night',
  'super-valley': 'mdi:car-electric',
};

const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has('_config')) {
    return true;
  }

  const oldHass = changedProps.get('hass');
  if (oldHass) {
    return oldHass.states[element._config.entity_id] !== element.hass.states[element._config.entity_id];
  }

  return true;
}

class PVPCHourlyPricingCard extends LitElement {
  static get properties() {
    return { _config: {}, hass: {} };
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    if (!config.entity_id) {
      throw new Error('Please define a "Spain electricity hourly pricing (PVPC)" entity');
    }

    this._config = config;

    this.setPVPCHourlyPricingObj();
  }

  setPVPCHourlyPricingObj() {
    if (!this.hass) return;

    this.pvpcHourlyPricingObj =
      this._config.entity_id in this.hass.states ? this.hass.states[this._config.entity_id] : null;
    if (!this.pvpcHourlyPricingObj) return;

    this.despiction = this.getDespiction(this.pvpcHourlyPricingObj.attributes);
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  updated(param) {
    this.setPVPCHourlyPricingObj();
    let chart = this.shadowRoot.getElementById('Chart');
    if (chart) chart.data = this.ChartData;
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    this.setPVPCHourlyPricingObj();
    this.numberElements = 0;
    this.lang =
      this._config.language === undefined || this._config.language === 'hacs'
        ? this.hass.selectedLanguage || this.hass.language
        : this._config.language;

    if (!this.pvpcHourlyPricingObj) {
      return html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.entity_id}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card header="${this._config.title ? this._config.title : ''}">
        ${this.renderCurrent()} ${this.renderGraph()}
      </ha-card>
    `;
  }

  renderCurrent() {
    this.numberElements++;

    return html`
      <div class="current tappable ${this.numberElements > 1 ? 'spacer' : ''}" @click="${this._handleClick}">
        <ha-icon class="period-icon" icon="${this.getTariffPeriodIcon(this.pvpcHourlyPricingObj.attributes.tariff)}">
        </ha-icon>
        <span class="currentPrice">${this.getFixedFloat(this.pvpcHourlyPricingObj.state)}</span>
        <span class="currentPriceUnit"> ${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}</span>
      </div>
    `;
  }

  renderGraph() {
    if (!this.despiction) {
      return html``;
    }

    this.numberElements++;

    this.drawChart();

    return html`
      <div class="clear ${this.numberElements > 1 ? 'spacer' : ''}">
        <ha-chart-base id="Chart"></ha-chart-base>
      </div>
    `;
  }

  drawChart() {
    if (!this.despiction) return;

    const that = this;

    const style = getComputedStyle(document.body);
    const legendTextColor = style.getPropertyValue('--primary-text-color');
    const axisTextColor = style.getPropertyValue('--secondary-text-color');
    const dividerColor = style.getPropertyValue('--divider-color');
    var today = new Date();
    let minIndex = this.despiction.minIndex;
    let maxIndex = this.despiction.maxIndex;
    let minIndexNextDay = this.despiction.minIndexNextDay;
    let maxIndexNextDay = this.despiction.maxIndexNextDay;
    let hasNextDayData = this.despiction.pricesNextDay[0] !== undefined;
    const minText = '▼';
    const maxText = '▲';
    const chartOptions = {
      type: 'bar',
      data: {
        labels: this.despiction.dateTime,
        datasets: [
          {
            label: that.getDateString(today),
            type: 'line',
            data: this.despiction.prices,
            yAxisID: 'PriceAxis',
            borderWidth: 2.0,
            lineTension: 0.0,
            pointRadius: 0.0,
            pointHitRadius: 5.0,
            fill: false,
          },
          {
            label: that.getDateString(today.setDate(today.getDate() + 1)),
            type: 'line',
            data: this.despiction.pricesNextDay,
            yAxisID: 'PriceAxis',
            borderWidth: 2.0,
            lineTension: 0.0,
            pointRadius: 0.0,
            pointHitRadius: 5.0,
            fill: false,
          },
        ],
      },
      options: {
        animation: {
          duration: 300,
          easing: 'linear',
          onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            var fontSize = 12;
            var fontStyle = 'normal';
            var fontFamily = 'Roboto';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            var meta = chartInstance.controller.getDatasetMeta(0);
            var minBar = meta.data[minIndex];
            ctx.fillStyle = meta.dataset._model.borderColor;
            ctx.fillText(minText, minBar._model.x, minBar._model.y + 2);
            var maxBar = meta.data[maxIndex];
            ctx.fillStyle = meta.dataset._model.borderColor;
            ctx.fillText(maxText, maxBar._model.x, maxBar._model.y);

            if (hasNextDayData) {
              var meta_next_day = chartInstance.controller.getDatasetMeta(1);
              var minNextDayBar = meta_next_day.data[minIndexNextDay];
              ctx.fillStyle = meta_next_day.dataset._model.borderColor;
              ctx.fillText(minText, minNextDayBar._model.x, minNextDayBar._model.y + 2);
              var maxNextDayBar = meta_next_day.data[maxIndexNextDay];
              ctx.fillStyle = meta_next_day.dataset._model.borderColor;
              ctx.fillText(maxText, maxNextDayBar._model.x, maxNextDayBar._model.y);
            }
          },
        },
        legend: {
          display: true,
          labels: {
            fontColor: legendTextColor,
            fontSize: 14,
            usePointStyle: true,
            boxWidth: 6,
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              maxBarThickness: 15,
              display: false,
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
            {
              id: 'DateAxis',
              position: 'bottom',
              gridLines: {
                display: true,
                drawBorder: false,
                color: dividerColor,
              },
              ticks: {
                display: true,
                source: 'labels',
                autoSkip: true,
                fontColor: axisTextColor,
                maxRotation: 0,
                callback: function (value, index, values) {
                  return that.getHourString.call(that, value);
                },
              },
            },
          ],
          yAxes: [
            {
              id: 'PriceAxis',
              position: 'left',
              gridLines: {
                display: true,
                drawBorder: false,
                color: dividerColor,
                borderDash: [4, 6],
              },
              ticks: {
                display: true,
                fontColor: axisTextColor,
              },
            },
          ],
        },
        tooltips: {
          mode: 'index',
          callbacks: {
            title: function (items, data) {
              const item = items[0];
              const date = new Date(data.labels[item.index]);
              const initDate = that.getTimeString(date);
              const endDate = that.getTimeString(date.setHours(date.getHours() + 1));
              return initDate + ' - ' + endDate;
            },
            label: function (tooltipItems, data) {
              var icon;
              const index = tooltipItems.index;

              if (tooltipItems.datasetIndex === 0) {
                if (index == minIndex) {
                  icon = minText;
                } else if (index == maxIndex) {
                  icon = maxText;
                }
              } else if (tooltipItems.datasetIndex === 1) {
                if (index == minIndexNextDay) {
                  icon = minText;
                } else if (index == maxIndexNextDay) {
                  icon = maxText;
                }
              }

              var labelTitle = data.datasets[tooltipItems.datasetIndex].label || '';
              var label =
                labelTitle +
                ': ' +
                parseFloat(tooltipItems.value).toFixed(5) +
                ' ' +
                that.pvpcHourlyPricingObj.attributes.unit_of_measurement +
                ' ';

              return icon ? label + icon : label;
            },
          },
        },
      },
    };

    this.ChartData = chartOptions;
  }

  getDespiction(attributes) {
    var data = [];
    var priceRegex = /price_\d\dh/;
    var priceNextDayRegex = /price_next_day_\d\dh/;

    const priceArray = Object.keys(attributes)
      .filter((key) => priceRegex.test(key))
      .map((key) => attributes[key]);
    const priceNextDayArray = Object.keys(attributes)
      .filter((key) => priceNextDayRegex.test(key))
      .map((key) => attributes[key]);

    let dateTime = [];
    let prices = [];
    let pricesNextDay = [];

    for (let index = 0; index < 24; index++) {
      dateTime.push(new Date().setHours(index, 0));
      prices.push(priceArray[index]);
      pricesNextDay.push(priceNextDayArray[index]);
    }

    data.dateTime = dateTime;
    data.prices = prices;
    data.pricesNextDay = pricesNextDay;

    data.minPrice = Math.min.apply(null, prices);
    data.maxPrice = Math.max.apply(null, prices);
    data.minIndex = prices.indexOf(data.minPrice);
    data.maxIndex = prices.indexOf(data.maxPrice);
    data.minPriceNextDay = Math.min.apply(null, pricesNextDay);
    data.maxPriceNextDay = Math.max.apply(null, pricesNextDay);
    data.minIndexNextDay = pricesNextDay.indexOf(data.minPriceNextDay);
    data.maxIndexNextDay = pricesNextDay.indexOf(data.maxPriceNextDay);

    return data;
  }

  getTariffPeriodIcon(tariff) {
    var icon;

    if (tariff == 'discrimination') {
      var utcHours = new Date().getUTCHours();
      if (utcHours >= 21 || utcHours < 11) {
        icon = 'valley';
      } else {
        icon = 'peak';
      }
    } else if (tariff == 'electric_car') {
      var hours = new Date().getHours();
      if (hours >= 13 && hours < 23) {
        icon = 'peak';
      } else if (hours >= 1 && hours < 3) {
        icon = 'valley';
      } else {
        icon = 'super-valley';
      }
    }

    return tariffPeriodIcons[icon];
  }

  getDateString(datetime) {
    return new Date(datetime).toLocaleDateString(this.lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getHourString(datetime) {
    return new Date(datetime).toLocaleTimeString(this.lang, { hour: '2-digit', hour12: false });
  }

  getTimeString(datetime) {
    return new Date(datetime).toLocaleTimeString(this.lang, { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  getFixedFloat(number) {
    return parseFloat(number).toFixed(5);
  }

  _handleClick() {
    fireEvent(this, 'hass-more-info', { entityId: this._config.entity_id });
  }

  getCardSize() {
    return this.numberElements || 3;
  }

  static get styles() {
    return css`
      ha-card {
        margin: auto;
        padding-top: 1.3em;
        padding-bottom: 1.3em;
        padding-left: 1em;
        padding-right: 1em;
        position: relative;
      }

      ha-icon {
        color: var(--paper-item-icon-color);
      }

      .spacer {
        padding-top: 1em;
      }

      .clear {
        clear: both;
      }

      .tappable {
        cursor: pointer;
      }

      .current {
        height: 6em;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .period-icon {
        width: 6em;
        height: 6em;
      }

      .currentPrice {
        font-weight: 300;
        font-size: 4em;
        color: var(--primary-text-color);
        margin-top: 0.5em;
        margin-right: 8px;
      }

      .currentPriceUnit {
        font-weight: 300;
        font-size: 1.5em;
        vertical-align: super;
        color: var(--primary-text-color);
        right: 0em;
        top: 0em;
        position: absolute;
        margin-right: 8px;
      }
    `;
  }
}

customElements.define('pvpc-hourly-pricing-card', PVPCHourlyPricingCard);
