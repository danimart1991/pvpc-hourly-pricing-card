const LitElement =
  window.LitElement ||
  Object.getPrototypeOf(customElements.get('ha-panel-lovelace') || customElements.get('hc-lovelace'));
const { html, css } = LitElement.prototype;

const locale = {
  ca: {
    minPrice: 'Preu mínim avui:',
    maxPrice: 'Preu màxim avui:',
    minPriceNextDay: 'Preu mínim demà:',
    maxPriceNextDay: 'Preu màxim demà:',
    infoNoNextDay: 'Les dades de demà encara no estan disponibles',
    from: 'de',
    to: 'a',
    optionName: 'Nom (Opcional)',
    optionEntity: 'Entitat PVPC (Necessari)',
    optionShowCurrent: 'Mostrar Estat Actual',
    optionShowDetails: 'Mostrar Detalls',
    optionShowGraph: 'Mostrar Gràfic',
    optionShowInfo: 'Mostrar Informació',
    optionInjection: 'Entitat preu injecció (Opcional)',
    injectionLabel: 'Excedents'
  },
  da: {
    minPrice: 'Minimumspris i dag:',
    maxPrice: 'Maksimal pris i dag:',
    minPriceNextDay: 'Minimumspris i morgen:',
    maxPriceNextDay: 'Maksimal pris i morgen:',
    infoNoNextDay: 'Morgendagens data er endnu ikke tilgængelige',
    from: 'fra',
    to: 'til',
    optionName: 'Navn (valgfrit)',
    optionEntity: 'Enhed (påkrævet)',
    optionShowCurrent: 'Vis nuværende status',
    optionShowDetails: 'Vis detaljer',
    optionShowGraph: 'Vis graf',
    optionShowInfo: 'Vis information'
  },
  de: {
    minPrice: 'Mindestpreis heute:',
    maxPrice: 'Maximaler preis heute:',
    minPriceNextDay: 'Mindestpreis morgen:',
    maxPriceNextDay: 'Maximaler preis morgen:',
    infoNoNextDay: 'Die Daten von morgen sind noch nicht verfügbar',
    from: 'von',
    to: 'bis',
    optionName: 'Name (optional)',
    optionEntity: 'Entity (Erforderlich)',
    optionShowCurrent: 'Aktuellen Status anzeigen',
    optionShowDetails: 'Details anzeigen',
    optionShowGraph: 'Grafik anzeigen',
    optionShowInfo: 'Informationen anzeigen'
  },
  en: {
    minPrice: 'Lowest price today:',
    maxPrice: 'Highest price today:',
    minPriceNextDay: 'Lowest price tomorrow:',
    maxPriceNextDay: 'Highest price tomorrow:',
    infoNoNextDay: "Tomorrow's data is not yet available",
    from: 'from',
    to: 'to',
    optionName: 'Name (Optional)',
    optionEntity: 'Entity (Required)',
    optionShowCurrent: 'Show Current State',
    optionShowDetails: 'Show Details',
    optionShowGraph: 'Show Graph',
    optionShowInfo: 'Show Info',
    optionInjection: 'Injection entity (Opcional)',
    injectionLabel: 'Surplus'
  },
  es: {
    minPrice: 'Precio mínimo hoy:',
    maxPrice: 'Precio máximo hoy:',
    minPriceNextDay: 'Precio mínimo mañana:',
    maxPriceNextDay: 'Precio máximo mañana:',
    infoNoNextDay: 'Los datos de mañana no están disponibles aún',
    from: 'de',
    to: 'a',
    optionName: 'Nombre (Opcional)',
    optionEntity: 'Entidad (Necesario)',
    optionShowCurrent: 'Mostrar Estado Actual',
    optionShowDetails: 'Mostrar Detalles',
    optionShowGraph: 'Mostrar Gráfico',
    optionShowInfo: 'Mostrar Información',
    optionInjection: 'Entidad precio inyección (Opcional)',
    injectionLabel: 'Excedentes'
  },
  fr: {
    minPrice: "Prix minimum aujourd'hui:",
    maxPrice: "Prix maximum aujourd'hui:",
    minPriceNextDay: 'Prix minimum demain:',
    maxPriceNextDay: 'Prix maximum demain:',
    infoNoNextDay: 'Les données de demain ne sont pas encore disponibles',
    from: 'de',
    to: 'à',
    optionName: 'Nom (Facultatif)',
    optionEntity: 'Entity (Required)',
    optionShowCurrent: "Afficher l'état actuel",
    optionShowDetails: 'Afficher les détails',
    optionShowGraph: 'Afficher le graphique',
    optionShowInfo: 'Afficher les informations'
  },
  nl: {
    minPrice: 'Minimumspris i dag:',
    maxPrice: 'Maksimal pris i dag:',
    minPriceNextDay: 'Minimum prijs morgen:',
    maxPriceNextDay: 'Maximale prijs morgen:',
    infoNoNextDay: 'De gegevens van morgen zijn nog niet beschikbaar',
    from: 'fra',
    to: 'til',
    optionName: 'Naam (optioneel)',
    optionEntity: 'Entiteit (vereist)',
    optionShowCurrent: 'Toon huidige status',
    optionShowDetails: 'Details weergeven',
    optionShowGraph: 'Show Graph',
    optionShowInfo: 'Informatie weergeven'
  },
  ru: {
    minPrice: 'Минимальная цена сегодня:',
    maxPrice: 'Максимальная цена сегодня:',
    minPriceNextDay: 'Минимальная цена завтра:',
    maxPriceNextDay: 'Максимальная цена завтра:',
    infoNoNextDay: 'Данные завтра еще не доступны',
    from: 'С',
    to: 'до',
    optionName: 'Имя (необязательно)',
    optionEntity: 'Entity (обязательно)',
    optionShowCurrent: 'Показать текущий статус',
    optionShowDetails: 'Показать детали',
    optionShowGraph: 'Показать график',
    optionShowInfo: 'Показать информацию'
  },
  sv: {
    minPrice: 'Lägsta pris idag:',
    maxPrice: 'Maxpris idag:',
    minPriceNextDay: 'Lägsta pris imorgon:',
    maxPriceNextDay: 'Maxpris i morgon:',
    infoNoNextDay: 'Morgondagens data är ännu inte tillgängliga',
    from: '',
    to: 'till',
    optionName: 'Namn (valfritt)',
    optionEntity: 'Enhet (obligatoriskt)',
    optionShowCurrent: 'Visa aktuell status',
    optionShowDetails: 'Visa detaljer',
    optionShowGraph: 'Visa graf',
    optionShowInfo: 'Visa information'
  }
};

const tariffPeriodIconColors = {
  Error: '--error-color',
  P3: '--success-color',
  P2: '--warning-color',
  P1: '--error-color'
};

const tariffPeriodIcons = {
  Error:
    'M 28.342306,10.429944 27.798557,32.995546 H 24.243272 L 23.657695,10.429944 Z M 28.133172,41.570057 H 23.86683 v -4.412736 h 4.266342 z',
  P3: 'm 2.5238392,17.238401 a 25.003164,25.003164 0 0 0 -0.6133588,1.888945 h 8.6436716 l 15.49805,22.870055 15.121052,-22.870055 h 8.891749 A 25.003164,25.003164 0 0 0 49.436017,17.238401 H 40.038344 L 26.052202,38.327015 12.06606,17.238401 Z',
  P2: 'M 31.032172,16.612305 20.999855,32.113255 15.66609,25.065424 H 0.97821381 a 25.017275,25.017275 0 0 0 -0.0332829,0.949884 25.017275,25.017275 0 0 0 0.0468985,0.940092 H 14.800215 l 6.199595,8.453119 10.03232,-15.502917 5.335714,7.049798 h 14.578421 a 25.017275,25.017275 0 0 0 0.03328,-0.940092 25.017275,25.017275 0 0 0 -0.0469,-0.949884 H 37.233737 Z',
  P1: 'M 2.5238392,34.768609 A 25.003164,25.003164 0 0 1 1.9104804,32.879664 h 8.6436716 l 15.49805,-22.870055 15.121052,22.870055 h 8.891749 a 25.003164,25.003164 0 0 1 -0.628986,1.888945 H 40.038344 L 26.052202,13.679995 12.06606,34.768609 Z'
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
    return {
      _config: { type: Object },
      hass: { type: Object }
    };
  }

  static getConfigElement() {
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

    this.setInjectionHourlyPricingObj = this._config.injection in this.hass.states ? this.hass.states[this._config.injection] : null;
    if (!this.setInjectionHourlyPricingObj) return;

    this.despictionInjection = this.getDespiction(this.setInjectionHourlyPricingObj.attributes);
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  updated(param) {
    this.setPVPCHourlyPricingObj();
    let chart = this.shadowRoot.getElementById('Chart');
    if (chart) {
      chart.type = this.ChartData.type;
      chart.data = this.ChartData.data;
      chart.options = this.ChartData.options;
    }
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
          <div class="not-found">Entity not available: ${this._config.entity}</div>
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
    const tariffPeriod = this.pvpcHourlyPricingObj.attributes.period || 'Error';
    const style = getComputedStyle(document.body);
    const iconColor = style.getPropertyValue(tariffPeriodIconColors[tariffPeriod]);

    return html`
      <div class="current tappable ${this.numberElements > 1 ? 'spacer' : ''}" @click="${this._handleClick}">
        <svg class="period-icon" viewBox="0 0 52 52">
          <circle fill="${iconColor}" r="25" cy="26" cx="26" />
          <path fill="#f9f9f9" d="${tariffPeriodIcons[tariffPeriod]}" />
        </svg>

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
        <div class="info clear ${this.numberElements > 1 ? 'spacer' : ''}">${this.ll('infoNoNextDay')}</div>
      `;
    } else {
      return html``;
    }
  }

  drawChart() {
    if (!this.despiction) return;

    const that = this;

    const style = getComputedStyle(document.body);
    const selectionColor = style.getPropertyValue('--secondary-text-color');
    const todayColor = '#377eb8';
    const tomorrowColor = '#ff7f00';
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
            data: this.despiction.prices,
            pointRadius: 0,
            borderColor: todayColor,
            backgroundColor: todayColor + '7F',
            fill: false,
            stepped: 'before'
          }
        ]
      },
      options: {
        animation: {
          duration: 0,
          easing: 'linear',
          onComplete: function (context) {
            const chartInstance = context.chart;
            const ctx = chartInstance.ctx;
            const meta = chartInstance._metasets[0];

            ctx.save();
            const selectedIndex =
              chartInstance._active && chartInstance._active.length > 0 && chartInstance._active[0].index < 24
                ? chartInstance._active[0].index
                : today.getHours();
            const yaxis = chartInstance.chartArea;
            const xBarStart = meta.data[selectedIndex].x;
            const xBarEnd = meta.data[selectedIndex + 1].x;
            const yBarStart = yaxis.top;
            const yBarEnd = yaxis.bottom;
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = selectionColor;
            ctx.fillRect(xBarStart, yBarStart, xBarEnd - xBarStart, yBarEnd - yBarStart);
            ctx.restore();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const minBarStart = meta.data[minIndex];
            const minBarEnd = meta.data[minIndex + 1];
            const pointToPointCenterXOffset = (minBarEnd.x - minBarStart.x) / 2;
            const maxBar = meta.data[maxIndex];
            const iconYOffset = 8;
            ctx.fillStyle = meta.dataset.options.borderColor;
            ctx.fillText(minIcon, minBarStart.x + pointToPointCenterXOffset, minBarStart.y - iconYOffset);
            ctx.fillText(maxIcon, maxBar.x + pointToPointCenterXOffset, maxBar.y - iconYOffset);

            if (hasNextDayData) {
              const meta_next_day = chartInstance._metasets[1];
              const minNextDayBar = meta_next_day.data[minIndexNextDay];
              const maxNextDayBar = meta_next_day.data[maxIndexNextDay];
              ctx.fillStyle = meta_next_day.dataset.options.borderColor;
              ctx.fillText(minIcon, minNextDayBar.x + pointToPointCenterXOffset, minNextDayBar.y - iconYOffset);
              ctx.fillText(maxIcon, maxNextDayBar.x + pointToPointCenterXOffset, maxNextDayBar.y - iconYOffset);
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            adapters: {
              date: {
                locale: this.hass.locale
              }
            },
            ticks: {
              maxRotation: 0,
              sampleSize: 5,
              autoSkipPadding: 20
            },
            time: {
              tooltipFormat: 'hours'
            }
          },
          y: {
            ticks: {
              maxTicksLimit: 7
            },
            title: {
              display: true,
              text: that.pvpcHourlyPricingObj.attributes.unit_of_measurement
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (tooltipItems, data) {
                let index =
                  tooltipItems[0].dataIndex != 24 ? tooltipItems[0].dataIndex : (tooltipItems[0].dataIndex = 23);
                let date = new Date(new Date().setHours(index, 0));
                let initDate = that.getTimeString(date);
                let endDate = that.getTimeString(date.setHours(date.getHours() + 1));
                return initDate + ' - ' + endDate;
              },
              label: function (tooltipItem, data) {
                let icon;
                const index = tooltipItem.dataIndex != 24 ? tooltipItem.dataIndex : (tooltipItem.dataIndex = 23);

                if (tooltipItem.datasetIndex === 0) {
                  if (index == minIndex) {
                    icon = minIcon;
                  } else if (index == maxIndex) {
                    icon = maxIcon;
                  }
                } else if (tooltipItem.datasetIndex === 1) {
                  if (index == minIndexNextDay) {
                    icon = minIcon;
                  } else if (index == maxIndexNextDay) {
                    icon = maxIcon;
                  }
                }

                const labelTitle = tooltipItem.dataset.label || '';
                const label =
                  labelTitle +
                  ': ' +
                  parseFloat(tooltipItem.raw).toFixed(5) +
                  ' ' +
                  that.pvpcHourlyPricingObj.attributes.unit_of_measurement +
                  ' ';

                return icon ? label + icon : label;
              }
            }
          },
          filler: {
            propagate: true
          },
          legend: {
            display: true,
            labels: {
              usePointStyle: true
            }
          }
        },
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 1.5
          },
          point: {
            hitRadius: 0,
            hoverRadius: 0
          }
        }
      }
    };

    if (hasNextDayData) {
      chartOptions.data.datasets.push({
        label: that.getDateString(today.setDate(today.getDate() + 1)),
        data: this.despiction.pricesNextDay,
        pointRadius: 0,
        borderColor: tomorrowColor,
        backgroundColor: tomorrowColor + '7F',
        fill: false,
        stepped: 'before'
      });
    }
    
    if (this.despictionInjection) {
        chartOptions.data.datasets.push({
          label: this.ll('injectionLabel'),
          data: this.despictionInjection.prices,
          pointRadius: 0,
          borderColor: todayColor,
          backgroundColor: todayColor + '7F',
          fill: false,
          stepped: 'before',
          borderDash: [4, 4]
        });
        if (hasNextDayData) {
          chartOptions.data.datasets.push({
            label: this.ll('injectionLabel'),
            data: this.despictionInjection.pricesNextDay,
            pointRadius: 0,
            borderColor: tomorrowColor,
            backgroundColor: tomorrowColor + '7F',
            fill: false,
            stepped: 'before',
            borderDash: [4, 4]
          });
        }
    }

    this.ChartData = chartOptions;
  }

  getDespiction(attributes) {
    const today = new Date();

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
      dateTime.push(new Date(today.setHours(index, 0)));
      prices.push(priceArray[index]);
      pricesNextDay.push(priceNextDayArray[index]);
    }

    dateTime.push(new Date(today.setHours(24, 0)));
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

  getDateString(datetime) {
    return new Date(datetime).toLocaleDateString(this.lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
        height: 5.5em;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .period-icon {
        padding-left: 16px;
        padding-right: 16px;
        width: 5.5em;
        height: 5.5em;
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

export class PVPCHourlyPricingCardEditor extends LitElement {
  setConfig(config) {
    this._config = { ...config };
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  get _entity() {
    return this._config.entity || '';
  }
  
  get _injection() {
    return this._config.injection || '';
  }

  get _name() {
    return this._config.name || '';
  }

  get _current() {
    return this._config.current !== false;
  }

  get _details() {
    return this._config.details !== false;
  }

  get _graph() {
    return this._config.graph !== false;
  }

  get _info() {
    return this._config.info !== false;
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    this.lang = this.hass.selectedLanguage || this.hass.language;

    const entities = Object.keys(this.hass.states).filter((eid) =>
      Object.keys(this.hass.states[eid].attributes).some((aid) => aid == 'min_price_at')
    );

    return html`
      <div class="card-config">
        <div class="side-by-side">
          <paper-input
            label="${this.ll('optionName')}"
            .value="${this._name}"
            .configValue="${'name'}"
            @value-changed="${this._valueChanged}"
          >
          </paper-input>
        </div>
        <div class="side-by-side">
          <paper-dropdown-menu
            label="${this.ll('optionEntity')}"
            @value-changed="${this._valueChanged}"
            .configValue="${'entity'}"
          >
            <paper-listbox slot="dropdown-content" .selected="${entities.indexOf(this._entity)}">
              ${entities.map((entity) => {
                return html` <paper-item>${entity}</paper-item> `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
        <div class="side-by-side">
          <paper-dropdown-menu
            label="${this.ll('optionInjection')}"
            @value-changed="${this._valueChanged}"
            .configValue="${'injection'}"
          >
            <paper-listbox slot="dropdown-content" .selected="${entities.indexOf(this._injection)}">
              ${entities.map((entity) => {
                return html` <paper-item>${entity}</paper-item> `;
              })}
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
        <div class="side-by-side">
          <div>
            <ha-switch
              .checked=${this._current}
              .configValue="${'current'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <label class="mdc-label">${this.ll('optionShowCurrent')}</label>
          </div>
          <div>
            <ha-switch
              .checked=${this._details}
              .configValue="${'details'}"
              @change="${this._valueChanged}"
            ></ha-switch>
            <label class="mdc-label">${this.ll('optionShowDetails')}</label>
          </div>
        </div>
        <div class="side-by-side">
          <div>
            <ha-switch .checked=${this._graph} .configValue="${'graph'}" @change="${this._valueChanged}"></ha-switch>
            <label class="mdc-label">${this.ll('optionShowGraph')}</label>
          </div>
          <div>
            <ha-switch .checked=${this._info} .configValue="${'info'}" @change="${this._valueChanged}"></ha-switch>
            <label class="mdc-label">${this.ll('optionShowInfo')}</label>
          </div>
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value
        };
      }
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }

  ll(str) {
    if (locale[this.lang] === undefined) return locale.en[str];
    return locale[this.lang][str];
  }

  static get styles() {
    return css`
      ha-switch {
        padding-top: 16px;
      }
      .mdc-label {
        margin-left: 12px;
        vertical-align: text-bottom;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1;
        padding-right: 4px;
      }
    `;
  }
}

customElements.define('pvpc-hourly-pricing-card-editor', PVPCHourlyPricingCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'pvpc-hourly-pricing-card',
  name: 'PVPC Hourly Pricing',
  preview: true,
  description: 'The PVPC Hourly Pricing card allows you to display propertly the PVPC Hourly Pricing entity.'
});
