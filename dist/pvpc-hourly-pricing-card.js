const LitElement = Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const locale = {
  da: {
    minPrice: 'Minimumspris i dag:',
    maxPrice: 'Maksimal pris i dag:',
    minPriceNextDay: 'Minimumspris i morgen:',
    maxPriceNextDay: 'Maksimal pris i morgen:',
    infoNoNextDay: 'Morgendagens data er endnu ikke tilgængelige',
    from: 'fra',
    to: 'til'
  },
  de: {
    minPrice: 'Mindestpreis heute:',
    maxPrice: 'Maximaler preis heute:',
    minPriceNextDay: 'Mindestpreis morgen:',
    maxPriceNextDay: 'Maximaler preis morgen:',
    infoNoNextDay: 'Die Daten von morgen sind noch nicht verfügbar',
    from: 'von',
    to: 'bis'
  },
  en: {
    minPrice: 'Lowest price today:',
    maxPrice: 'Highest price today:',
    minPriceNextDay: 'Lowest price tomorrow:',
    maxPriceNextDay: 'Highest price tomorrow:',
    infoNoNextDay: "Tomorrow's data is not yet available",
    from: 'from',
    to: 'to'
  },
  es: {
    minPrice: 'Precio mínimo hoy:',
    maxPrice: 'Precio máximo hoy:',
    minPriceNextDay: 'Precio mínimo mañana:',
    maxPriceNextDay: 'Precio máximo mañana:',
    infoNoNextDay: 'Los datos de mañana no están disponibles aún',
    from: 'de',
    to: 'a'
  },
  fr: {
    minPrice: "Prix minimum aujourd'hui:",
    maxPrice: "Prix maximum aujourd'hui:",
    minPriceNextDay: 'Prix minimum demain:',
    maxPriceNextDay: 'Prix maximum demain:',
    infoNoNextDay: 'Les données de demain ne sont pas encore disponibles',
    from: 'de',
    to: 'à'
  },
  nl: {
    minPrice: 'Minimumspris i dag:',
    maxPrice: 'Maksimal pris i dag:',
    minPriceNextDay: 'Minimum prijs morgen:',
    maxPriceNextDay: 'Maximale prijs morgen:',
    infoNoNextDay: 'De gegevens van morgen zijn nog niet beschikbaar',
    from: 'fra',
    to: 'til'
  },
  ru: {
    minPrice: 'Минимальная цена сегодня:',
    maxPrice: 'Максимальная цена сегодня:',
    minPriceNextDay: 'Минимальная цена завтра:',
    maxPriceNextDay: 'Максимальная цена завтра:',
    infoNoNextDay: 'Данные завтра еще не доступны',
    from: 'С',
    to: 'до'
  },
  sv: {
    minPrice: 'Lägsta pris idag:',
    maxPrice: 'Maxpris idag:',
    minPriceNextDay: 'Lägsta pris imorgon:',
    maxPriceNextDay: 'Maxpris i morgon:',
    infoNoNextDay: 'Morgondagens data är ännu inte tillgängliga',
    from: '',
    to: 'till'
  }
};

const tariffPeriodIcons = {
  error: 'mdi:alert-circle',
  peak: 'mdi:weather-sunny',
  valley: 'mdi:weather-night',
  'super-valley': 'mdi:car-electric'
};

const fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
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
    return oldHass.states[element._config.entity] !== element.hass.states[element._config.entity];
  }

  return true;
}

class PVPCHourlyPricingCard extends LitElement {
  static get properties() {
    return { _config: {}, hass: {} };
  }

  static async getConfigElement() {
    await import('./pvpc-hourly-pricing-card-editor.js');
    return document.createElement('pvpc-hourly-pricing-card-editor');
  }

  static getStubConfig(hass, entities, entitiesFallback) {
    const entity = Object.keys(hass.states).find((eid) =>
      Object.keys(hass.states[eid].attributes).some((aid) => aid == 'min_price_at')
    );
    return { entity: entity };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define a "Spain electricity hourly pricing (PVPC)" entity');
    }

    this._config = config;

    this.setPVPCHourlyPricingObj();
  }

  setPVPCHourlyPricingObj() {
    if (!this.hass) return;

    this.pvpcHourlyPricingObj = this._config.entity in this.hass.states ? this.hass.states[this._config.entity] : null;
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
    this.lang = this.hass.selectedLanguage || this.hass.language;

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
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card header="${this._config.name ? this._config.name : ''}">
        ${this._config.current !== false ? this.renderCurrent() : ''}
        ${this._config.details !== false ? this.renderDetails() : ''}
        ${this._config.graph !== false ? this.renderGraph() : ''}
        ${this._config.info !== false ? this.renderInfo() : ''}
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

  renderDetails() {
    if (!this.despiction) {
      return html``;
    }

    const minPrice = this.getFixedFloat(this.despiction.minPrice);
    const minPriceFrom = this.getTimeString(new Date().setHours(this.despiction.minIndex, 0));
    const minPriceTo = this.getTimeString(new Date().setHours(this.despiction.minIndex + 1, 0));
    const maxPrice = this.getFixedFloat(this.despiction.maxPrice);
    const maxPriceFrom = this.getTimeString(new Date().setHours(this.despiction.maxIndex, 0));
    const maxPriceTo = this.getTimeString(new Date().setHours(this.despiction.maxIndex + 1, 0));
    const minPriceNextDay = this.getFixedFloat(this.despiction.minPriceNextDay);
    const minPriceFromNextDay = this.getTimeString(new Date().setHours(this.despiction.minIndexNextDay, 0));
    const minPriceToNextDay = this.getTimeString(new Date().setHours(this.despiction.minIndexNextDay + 1, 0));
    const maxPriceNextDay = this.getFixedFloat(this.despiction.maxPriceNextDay);
    const maxPriceFromNextDay = this.getTimeString(new Date().setHours(this.despiction.maxIndexNextDay, 0));
    const maxPriceToNextDay = this.getTimeString(new Date().setHours(this.despiction.maxIndexNextDay + 1, 0));

    this.numberElements++;

    return html`
      <ul class="details tappable ${this.numberElements > 1 ? 'spacer' : ''}" @click="${this._handleClick}">
        <li>
          <ha-icon icon="mdi:thumb-up-outline"></ha-icon>
          ${this.ll('minPrice')} ${minPrice}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}
          ${this.ll('from')} ${minPriceFrom} ${this.ll('to')} ${minPriceTo}
        </li>
        <li>
          <ha-icon icon="mdi:thumb-down-outline"></ha-icon>
          ${this.ll('maxPrice')} ${maxPrice}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}
          ${this.ll('from')} ${maxPriceFrom} ${this.ll('to')} ${maxPriceTo}
        </li>
        ${this.despiction.minPriceNextDay
          ? html` <li>
                <ha-icon icon="mdi:thumb-up-outline"></ha-icon>
                ${this.ll('minPriceNextDay')}
                ${minPriceNextDay}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement} ${this.ll('from')}
                ${minPriceFromNextDay} ${this.ll('to')} ${minPriceToNextDay}
              </li>
              <li>
                <ha-icon icon="mdi:thumb-down-outline"></ha-icon>
                ${this.ll('maxPriceNextDay')}
                ${maxPriceNextDay}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement} ${this.ll('from')}
                ${maxPriceFromNextDay} ${this.ll('to')} ${maxPriceToNextDay}
              </li>`
          : ''}
      </ul>
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

  renderInfo() {
    if (!this.despiction) {
      return html``;
    }

    this.numberElements++;

    if (!this.despiction.minPriceNextDay) {
      return html`
        <div class="info clear ${this.numberElements > 1 ? 'spacer' : ''}">
          ${this.ll('infoNoNextDay')}
        </div>
      `;
    } else {
      return html``;
    }
  }

  drawChart() {
    if (!this.despiction) return;

    const that = this;

    const style = getComputedStyle(document.body);
    const legendTextColor = style.getPropertyValue('--primary-text-color');
    const axisTextColor = style.getPropertyValue('--secondary-text-color');
    const dividerColor = style.getPropertyValue('--divider-color');
    const selectionColor = style.getPropertyValue('--paper-item-icon-color');
    const today = new Date();
    const minIndex = this.despiction.minIndex;
    const maxIndex = this.despiction.maxIndex;
    const minIndexNextDay = this.despiction.minIndexNextDay;
    const maxIndexNextDay = this.despiction.maxIndexNextDay;
    const hasNextDayData = this.despiction.pricesNextDay[0] !== undefined;
    const minIcon = '▼';
    const maxIcon = '▲';

    const chartOptions = {
      type: 'line',
      data: {
        labels: this.despiction.dateTime,
        datasets: [
          {
            label: that.getDateString(today),
            type: 'line',
            data: this.despiction.prices,
            borderWidth: 2.0,
            pointRadius: 0.0,
            pointHitRadius: 0.0,
            fill: false,
            steppedLine: true
          }
        ]
      },
      options: {
        animation: {
          duration: 300,
          easing: 'linear',
          onComplete: function () {
            const chartInstance = this.chart;
            const ctx = chartInstance.ctx;
            const fontSize = 12;
            const fontStyle = 'normal';
            const fontFamily = 'Roboto';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const meta = chartInstance.controller.getDatasetMeta(0);
            const minBarStart = meta.data[minIndex];
            const minBarEnd = meta.data[minIndex + 1];
            const pointToPointCenterXOffset = (minBarEnd._model.x - minBarStart._model.x) / 2;
            const maxBar = meta.data[maxIndex];
            const iconYOffset = 8;
            ctx.fillStyle = meta.dataset._model.borderColor;
            ctx.fillText(minIcon, minBarStart._model.x + pointToPointCenterXOffset, minBarStart._model.y - iconYOffset);
            ctx.fillText(maxIcon, maxBar._model.x + pointToPointCenterXOffset, maxBar._model.y - iconYOffset);

            ctx.save();
            const selectedIndex =
              chartInstance.tooltip._active && chartInstance.tooltip._active.length > 0
                ? chartInstance.tooltip._active[0]._index
                : today.getHours();
            const yaxis = meta.controller.chart.scales['y-axis-0'];
            const xBarStart = meta.data[selectedIndex]._model.x;
            const xBarEnd = meta.data[selectedIndex + 1]._model.x;
            const yBarStart = yaxis.top;
            const yBarEnd = yaxis.bottom;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(xBarStart, yBarStart);
            ctx.lineTo(xBarStart, yBarEnd);
            ctx.strokeStyle = selectionColor;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(xBarEnd, yBarStart);
            ctx.lineTo(xBarEnd, yBarEnd);
            ctx.strokeStyle = selectionColor;
            ctx.stroke();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = selectionColor;
            ctx.fillRect(xBarStart, yBarStart, xBarEnd - xBarStart, yBarEnd - yBarStart);
            ctx.restore();

            if (hasNextDayData) {
              const meta_next_day = chartInstance.controller.getDatasetMeta(1);
              const minNextDayBar = meta_next_day.data[minIndexNextDay];
              const maxNextDayBar = meta_next_day.data[maxIndexNextDay];
              ctx.fillStyle = meta_next_day.dataset._model.borderColor;
              ctx.fillText(
                minIcon,
                minNextDayBar._model.x + pointToPointCenterXOffset,
                minNextDayBar._model.y - iconYOffset
              );
              ctx.fillText(
                maxIcon,
                maxNextDayBar._model.x + pointToPointCenterXOffset,
                maxNextDayBar._model.y - iconYOffset
              );
            }
          }
        },
        legend: {
          display: true,
          labels: {
            fontColor: legendTextColor,
            fontSize: 14,
            usePointStyle: true,
            boxWidth: 6
          }
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              maxBarThickness: 15,
              display: false,
              ticks: {
                display: false
              },
              gridLines: {
                display: false
              }
            },
            {
              position: 'bottom',
              gridLines: {
                display: true,
                drawTicks: false,
                drawBorder: false,
                color: dividerColor
              },
              ticks: {
                display: true,
                padding: 10,
                source: 'labels',
                autoSkip: true,
                fontColor: axisTextColor,
                maxRotation: 0,
                callback: function (value, index, values) {
                  return that.getHourString.call(that, value);
                }
              }
            }
          ],
          yAxes: [
            {
              position: 'left',
              gridLines: {
                display: true,
                drawBorder: false,
                drawTicks: false,
                color: dividerColor,
                borderDash: [4, 6]
              },
              ticks: {
                display: true,
                padding: 10,
                fontColor: axisTextColor
              }
            }
          ]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: function (items, data) {
              const index = items[0].index != 24 ? items[0].index : 23;

              const date = new Date(data.labels[index]);
              const initDate = that.getTimeString(date);
              const endDate = that.getTimeString(date.setHours(date.getHours() + 1));
              return initDate + ' - ' + endDate;
            },
            label: function (tooltipItems, data) {
              let icon;
              const index = tooltipItems.index != 24 ? tooltipItems.index : 23;

              if (tooltipItems.datasetIndex === 0) {
                if (index == minIndex) {
                  icon = minIcon;
                } else if (index == maxIndex) {
                  icon = maxIcon;
                }
              } else if (tooltipItems.datasetIndex === 1) {
                if (index == minIndexNextDay) {
                  icon = minIcon;
                } else if (index == maxIndexNextDay) {
                  icon = maxIcon;
                }
              }

              const labelTitle = data.datasets[tooltipItems.datasetIndex].label || '';
              const label =
                labelTitle +
                ': ' +
                parseFloat(tooltipItems.value).toFixed(5) +
                ' ' +
                that.pvpcHourlyPricingObj.attributes.unit_of_measurement +
                ' ';

              return icon ? label + icon : label;
            }
          }
        }
      }
    };

    if (hasNextDayData) {
      chartOptions.data.datasets.push({
        label: that.getDateString(today.setDate(today.getDate() + 1)),
        type: 'line',
        data: this.despiction.pricesNextDay,
        borderWidth: 2.0,
        pointRadius: 0.0,
        pointHitRadius: 0.0,
        fill: false,
        steppedLine: true
      });
    }

    this.ChartData = chartOptions;
  }

  getDespiction(attributes) {
    const priceRegex = /price_\d\dh/;
    const priceNextDayRegex = /price_(next|last)_day_\d\dh/;

    const priceArray = Object.keys(attributes)
      .filter((key) => priceRegex.test(key))
      .map((key) => attributes[key]);
    const priceNextDayArray = Object.keys(attributes)
      .filter((key) => priceNextDayRegex.test(key))
      .map((key) => attributes[key]);

    let data = [];
    let dateTime = [];
    let prices = [];
    let pricesNextDay = [];

    for (let index = 0; index < 24; index++) {
      dateTime.push(new Date().setHours(index, 0));
      prices.push(priceArray[index]);
      pricesNextDay.push(priceNextDayArray[index]);
    }

    dateTime.push(new Date().setHours(24, 0));
    prices.push(priceArray[23]);
    pricesNextDay.push(priceNextDayArray[23]);

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
    let icon;

    switch (tariff) {
      case 'normal':
        break;
      case 'discrimination':
        const utcHours = new Date().getUTCHours();
        if (utcHours >= 21 || utcHours < 11) {
          icon = 'valley';
        } else {
          icon = 'peak';
        }
        break;
      case 'electric_car':
        const hours = new Date().getHours();
        if (hours >= 13 && hours < 23) {
          icon = 'peak';
        } else if (hours >= 1 && hours < 3) {
          icon = 'valley';
        } else {
          icon = 'super-valley';
        }
        break;
      default:
        icon = 'error';
    }

    return icon ? tariffPeriodIcons[icon] : '';
  }

  getDateString(datetime) {
    return new Date(datetime).toLocaleDateString(this.lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
    fireEvent(this, 'hass-more-info', { entityId: this._config.entity });
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

      .details {
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        padding-right: 1em;
        padding-left: 1em;
      }

      .details li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .details ha-icon {
        height: 22px;
        margin-right: 4px;
      }

      .info {
        color: var(--primary-text-color);
        text-align: center;
        padding-right: 1em;
        padding-left: 1em;
      }
    `;
  }

  ll(str) {
    if (locale[this.lang] === undefined) return locale.en[str];
    return locale[this.lang][str];
  }
}

customElements.define('pvpc-hourly-pricing-card', PVPCHourlyPricingCard);
