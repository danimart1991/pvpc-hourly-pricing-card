class PVPCHourlyPricingCard extends Polymer.Element {
  static get template() {
    return Polymer.html`
      <style>
        ha-card {
          padding: 12px 0 0 0;
        }
        ha-icon {
          color: var(--paper-item-icon-color);
        }
        .card {
          padding: 0 18px 18px 18px;
        }
        .main {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: -10px;
          margin-right: 32px;
        }
        .main ha-icon {
          --iron-icon-height:  72px;
          --iron-icon-width:  72px;
          margin-right: 8px;
        }
        .main div {
          cursor: pointer;
          font-size: 52px;
          line-height: 1em;
          position: relative;
        }
        .main sup {
          font-size: 24px;
          line-height: 1em;
          position: absolute;
          top: 4px;
        }
      </style>
      <ha-card header="[[title]]">
        <div class="card">
          <div class="main">
            <template is="dom-if" if="[[getTariffStatusIcon(pvpcHourlyPricingObj.attributes.tariff)]]">
              <ha-icon icon="[[getTariffStatusIcon(pvpcHourlyPricingObj.attributes.tariff)]]"></ha-icon>
            </template>
            <div on-click="_pvpcHourlyPricingAttr">[[pvpcHourlyPricingObj.state]]<sup>[[pvpcHourlyPricingObj.attributes.unit_of_measurement]]</sup></div>
          </div>
          <ha-chart-base data="[[ChartData]]"></ha-chart-base>
          <template is="dom-repeat" items="[[data]]"></template>
        </div>
      </ha-card>
    `;
  }

  static get properties() {
    return {
      config: Object,
      pvpcHourlyPricingObj: {
        type: Object,
        observer: 'dataChanged',
      },
    };
  }

  constructor() {
    super();
    this.tariffIcons = {
      peak: 'mdi:weather-sunny',
      valley: 'mdi:weather-night',
      'super-valley': 'mdi:car-electric',
    };
  }

  setConfig(config) {
    this.config = config;
    this.title = config.title;
    this.pvpcHourlyPricingObj = config.entity_id;
    if (!config.entity_id) {
      throw new Error('Please define a "Spain electricity hourly pricing (PVPC)" entity in the card config');
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.lang = this._hass.selectedLanguage || this._hass.language;
    this.pvpcHourlyPricingObj = this.config.entity_id in hass.states ? hass.states[this.config.entity_id] : null;
    this.data = this.getData(this.pvpcHourlyPricingObj.attributes);
  }

  dataChanged() {
    this.drawChart();
  }

  getCardSize() {
    return 4;
  }

  getTariffStatusIcon(tariff) {
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

    return this.tariffIcons[icon];
  }

  getData(attributes) {
    var data = [];
    var priceRegex = /price_\d\dh/;
    var priceNextDayRegex = /price_next_day_\d\dh/;

    const priceArray = Object.keys(attributes)
      .filter((key) => priceRegex.test(key))
      .map((key) => attributes[key]);
    const priceNextDayArray = Object.keys(attributes)
      .filter((key) => priceNextDayRegex.test(key))
      .map((key) => attributes[key]);

    for (let index = 0; index < 24; index++) {
      data.push({
        datetime: new Date().setHours(index, 0),
        prices: priceArray[index],
        pricesNextDay: priceNextDayArray[index],
      });
    }

    return data;
  }

  drawChart() {
    var data = this.getData(this.pvpcHourlyPricingObj.attributes);
    var locale = this._hass.selectedLanguage || this._hass.language;
    var energyUnit = this.pvpcHourlyPricingObj.attributes.unit_of_measurement;
    var i;
    if (!data) {
      return [];
    }
    var dateTime = [];
    var prices = [];
    var pricesNextDay = [];
    for (i = 0; i < data.length; i++) {
      var d = data[i];
      dateTime.push(new Date(d.datetime));
      prices.push(d.prices);
      pricesNextDay.push(d.pricesNextDay);
    }
    var style = getComputedStyle(document.body);
    var legendTextColor = style.getPropertyValue('--primary-text-color');
    var axisTextColor = style.getPropertyValue('--secondary-text-color');
    var dividerColor = style.getPropertyValue('--divider-color');
    var today = new Date();
    var minIndex = prices.indexOf(Math.min.apply(null, prices));
    var maxIndex = prices.indexOf(Math.max.apply(null, prices));
    var minNextDayIndex = pricesNextDay.indexOf(Math.min.apply(null, pricesNextDay));
    var maxNextDayIndex = pricesNextDay.indexOf(Math.max.apply(null, pricesNextDay));
    const minText = '▼';
    const maxText = '▲';
    const chartOptions = {
      type: 'bar',
      data: {
        labels: dateTime,
        datasets: [
          {
            label: today.toLocaleDateString(locale, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            type: 'line',
            data: prices,
            yAxisID: 'PriceAxis',
            borderWidth: 2.0,
            lineTension: 0.0,
            pointRadius: 0.0,
            pointHitRadius: 5.0,
            fill: false,
          },
          {
            label: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(locale, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            type: 'line',
            data: pricesNextDay,
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
            var meta_next_day = chartInstance.controller.getDatasetMeta(1);

            if (minIndex > -1) {
              var minBar = meta.data[minIndex];
              ctx.fillStyle = meta.dataset._model.borderColor;
              ctx.fillText(minText, minBar._model.x, minBar._model.y + 2);
            }

            if (maxIndex > -1) {
              var maxBar = meta.data[maxIndex];
              ctx.fillStyle = meta.dataset._model.borderColor;
              ctx.fillText(maxText, maxBar._model.x, maxBar._model.y);
            }

            if (minNextDayIndex > -1) {
              var minNextDayBar = meta_next_day.data[minNextDayIndex];
              ctx.fillStyle = meta_next_day.dataset._model.borderColor;
              ctx.fillText(minText, minNextDayBar._model.x, minNextDayBar._model.y + 2);
            }

            if (maxNextDayIndex > -1) {
              var maxNextDayBar = meta_next_day.data[maxNextDayIndex];
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
                callback: function (value) {
                  var time = new Date(value).toLocaleTimeString(locale, { hour: '2-digit' });
                  return time;
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
              const initDate = new Date(date).toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              });
              const endDate = new Date(date.setHours(date.getHours() + 1)).toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              });
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
                if (index == minNextDayIndex) {
                  icon = minText;
                } else if (index == maxNextDayIndex) {
                  icon = maxText;
                }
              }

              var labelTitle = data.datasets[tooltipItems.datasetIndex].label || '';
              var label = labelTitle + ': ' + tooltipItems.value + ' ' + energyUnit + ' ';

              return icon ? label + icon : label;
            },
          },
        },
      },
    };
    this.ChartData = chartOptions;
  }

  _fire(type, detail, options) {
    const node = this.shadowRoot;
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const e = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed,
    });
    e.detail = detail;
    node.dispatchEvent(e);
    return e;
  }

  _pvpcHourlyPricingAttr() {
    this._fire('hass-more-info', { entityId: this.config.entity_id });
  }
}

customElements.define('pvpc-hourly-pricing-card', PVPCHourlyPricingCard);
