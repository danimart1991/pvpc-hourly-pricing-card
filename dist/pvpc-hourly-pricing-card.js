const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const { html, css } = LitElement.prototype;

const locale = {
  ca: {
    minPrice: "Preu mínim avui:",
    maxPrice: "Preu màxim avui:",
    minPriceNextDay: "Preu mínim demà:",
    maxPriceNextDay: "Preu màxim demà:",
    infoNoNextDay: "Les dades de demà encara no estan disponibles",
    from: "de",
    to: "a",
    show_current: "Mostrar estat actual",
    show_details: "Mostrar detalls",
    show_graph: "Mostrar gràfic",
    show_info: "Mostrar informació",
    show_only_today: "Mostra solament dia actual",
    graph_baseline_zero: "Línia base zero (gràfic)",
    optionInjection: "Entitat preu injecció (opcional)",
  },
  da: {
    minPrice: "Minimumspris i dag:",
    maxPrice: "Maksimal pris i dag:",
    minPriceNextDay: "Minimumspris i morgen:",
    maxPriceNextDay: "Maksimal pris i morgen:",
    infoNoNextDay: "Morgendagens data er endnu ikke tilgængelige",
    from: "fra",
    to: "til",
    show_current: "Vis nuværende status",
    show_details: "Vis detaljer",
    show_graph: "Vis graf",
    show_info: "Vis information",
    show_only_today: "Vis kun den aktuelle dag",
    graph_baseline_zero: "Nul baseline (graf)",
    optionInjection: "Injektionsprisenhed (valgfrit)",
  },
  de: {
    minPrice: "Minimalpreis heute:",
    maxPrice: "Maximalpreis heute:",
    minPriceNextDay: "Minimalpreis morgen:",
    maxPriceNextDay: "Maximalpreis morgen:",
    infoNoNextDay: "Die Daten von morgen sind noch nicht verfügbar",
    from: "von",
    to: "bis",
    show_current: "Aktuellen Status anzeigen",
    show_details: "Details anzeigen",
    show_graph: "Grafik anzeigen",
    show_info: "Informationen anzeigen",
    show_only_today: "Nur aktuellen tag anzeigen",
    graph_baseline_zero: "Null-basislinie (grafik)",
    optionInjection: "Injektionspreiseinheit (optional)",
  },
  en: {
    minPrice: "Lowest price today:",
    maxPrice: "Highest price today:",
    minPriceNextDay: "Lowest price tomorrow:",
    maxPriceNextDay: "Highest price tomorrow:",
    infoNoNextDay: "Tomorrow's data is not yet available",
    from: "from",
    to: "to",
    show_current: "Show current state",
    show_details: "Show details",
    show_graph: "Show graph",
    show_info: "Show info",
    show_only_today: "Show only current day",
    graph_baseline_zero: "Baseline zero (graph)",
    optionInjection: "Injection price entity (optional)",
  },
  es: {
    minPrice: "Precio mínimo hoy:",
    maxPrice: "Precio máximo hoy:",
    minPriceNextDay: "Precio mínimo mañana:",
    maxPriceNextDay: "Precio máximo mañana:",
    infoNoNextDay: "Los datos de mañana no están disponibles aún",
    from: "de",
    to: "a",
    show_current: "Mostrar estado actual",
    show_details: "Mostrar detalles",
    show_graph: "Mostrar gráfico",
    show_info: "Mostrar información",
    show_only_today: "Mostrar solo día actual",
    graph_baseline_zero: "Línea base cero (gráfico)",
    entity_injection: "Entidad precio inyección (opcional)",
  },
  fr: {
    minPrice: "Prix minimum aujourd'hui:",
    maxPrice: "Prix maximum aujourd'hui:",
    minPriceNextDay: "Prix minimum demain:",
    maxPriceNextDay: "Prix maximum demain:",
    infoNoNextDay: "Les données de demain ne sont pas encore disponibles",
    from: "de",
    to: "à",
    show_current: "Afficher l'état actuel",
    show_details: "Afficher les détails",
    show_graph: "Afficher le graphique",
    show_info: "Afficher les informations",
    show_only_today: "Afficher uniquement le jour en cours",
    graph_baseline_zero: "Référence zéro (graphique)",
    entity_injection: "Entité de prix d'injection (facultatif)",
  },
  nl: {
    minPrice: "Minimumspris i dag:",
    maxPrice: "Maksimal pris i dag:",
    minPriceNextDay: "Minimum prijs morgen:",
    maxPriceNextDay: "Maximale prijs morgen:",
    infoNoNextDay: "De gegevens van morgen zijn nog niet beschikbaar",
    from: "fra",
    to: "til",
    show_current: "Toon huidige status",
    show_details: "Details weergeven",
    show_graph: "Show graph",
    show_info: "Informatie weergeven",
    show_only_today: "Alleen huidige dag weergeven",
    graph_baseline_zero: "Nul basislijn (graph)",
    entity_injection: "Injectieprijsentiteit (optioneel)",
  },
  pt: {
    minPrice: "Preço mínimo hoje:",
    maxPrice: "Preço máximo hoje:",
    minPriceNextDay: "Preço mínimo amanhã:",
    maxPriceNextDay: "Preço máximo amanhã:",
    infoNoNextDay: "Os dados de amanhã ainda não estão disponíveis",
    from: "das",
    to: "às",
    show_current: "Mostrar estado actual",
    show_details: "Mostrar detalhes",
    show_graph: "Mostrar gráfico",
    show_info: "Mostrar informação",
    show_only_today: "Mostrar apenas o dia atual",
    graph_baseline_zero: "Linha de base zero (gráfico)",
    entity_injection: "Entidade de preço de injeção (opcional)",
  },
  ru: {
    minPrice: "Минимальная цена сегодня:",
    maxPrice: "Максимальная цена сегодня:",
    minPriceNextDay: "Минимальная цена завтра:",
    maxPriceNextDay: "Максимальная цена завтра:",
    infoNoNextDay: "Данные завтра еще не доступны",
    from: "С",
    to: "до",
    show_current: "Показать текущий статус",
    show_details: "Показать детали",
    show_graph: "Показать график",
    show_info: "Показать информацию",
    show_only_today: "Показать только текущий день",
    graph_baseline_zero: "Нулевая базовая линия (график)",
    entity_injection: "Объект цены впрыска (необязательно)",
  },
  sk: {
    minPrice: "Najnižšia cena dnes:",
    maxPrice: "Najvyššia cena dnes:",
    minPriceNextDay: "Najnižšia cena zajtra:",
    maxPriceNextDay: "Najvyššia cena zajtra:",
    infoNoNextDay: "Zajtrajšie údaje ešte nie sú k dispozícii",
    from: "od",
    to: "do",
    show_current: "Zobraziť aktuálny stav",
    show_details: "Zobraziť podrobnosti",
    show_graph: "Zobraziť graf",
    show_info: "Zobraziť informácie",
    show_only_today: "Visa endast aktuell dag",
    graph_baseline_zero: "Východisková nula (graf)",
    entity_injection: "Injektionsprisenhet (valfritt)",
  },
  sv: {
    minPrice: "Lägsta pris idag:",
    maxPrice: "Maxpris idag:",
    minPriceNextDay: "Lägsta pris imorgon:",
    maxPriceNextDay: "Maxpris i morgon:",
    infoNoNextDay: "Morgondagens data är ännu inte tillgängliga",
    from: "",
    to: "till",
    title: "Namn (valfritt)",
    show_current: "Visa aktuell status",
    show_details: "Visa detaljer",
    show_graph: "Visa graf",
    show_info: "Visa information",
    show_only_today: "Zobraziť iba aktuálny deň",
    graph_baseline_zero: "Noll baslinje (graf)",
    entity_injection: "Subjekt ceny vstrekovania (voliteľné)",
  },
};

const tariffPeriodIconColors = {
  Error: "--error-color",
  P3: "--success-color",
  P2: "--warning-color",
  P1: "--error-color",
};

const tariffPeriodIcons = {
  Error:
    "M 28.342306,10.429944 27.798557,32.995546 H 24.243272 L 23.657695,10.429944 Z M 28.133172,41.570057 H 23.86683 v -4.412736 h 4.266342 z",
  P3: "m 2.5238392,17.238401 a 25.003164,25.003164 0 0 0 -0.6133588,1.888945 h 8.6436716 l 15.49805,22.870055 15.121052,-22.870055 h 8.891749 A 25.003164,25.003164 0 0 0 49.436017,17.238401 H 40.038344 L 26.052202,38.327015 12.06606,17.238401 Z",
  P2: "M 31.032172,16.612305 20.999855,32.113255 15.66609,25.065424 H 0.97821381 a 25.017275,25.017275 0 0 0 -0.0332829,0.949884 25.017275,25.017275 0 0 0 0.0468985,0.940092 H 14.800215 l 6.199595,8.453119 10.03232,-15.502917 5.335714,7.049798 h 14.578421 a 25.017275,25.017275 0 0 0 0.03328,-0.940092 25.017275,25.017275 0 0 0 -0.0469,-0.949884 H 37.233737 Z",
  P1: "M 2.5238392,34.768609 A 25.003164,25.003164 0 0 1 1.9104804,32.879664 h 8.6436716 l 15.49805,-22.870055 15.121052,22.870055 h 8.891749 a 25.003164,25.003164 0 0 1 -0.628986,1.888945 H 40.038344 L 26.052202,13.679995 12.06606,34.768609 Z",
};

const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new Event(type, {
    bubbles: options.bubbles ?? true,
    cancelable: options.cancelable ?? false,
    composed: options.composed ?? true,
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

class ChartBase extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      options: { type: Object },
    };
  }

  render() {
    return html`
      <div class="container">
        <div class="chart-container">
          <div class="chart" style="width:100%; height:100%;"></div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this._setupChart();
  }

  async _setupChart() {
    if (!window.echarts) {
      await import("https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js");
    }

    const container = this.shadowRoot.querySelector(".chart");
    this.chart = echarts.init(container);

    if (this.options) {
      this.chart.setOption(this.options, true);
    }

    this._resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.chart?.resize());
    });
    this._resizeObserver.observe(container);
  }

  updated(changedProps) {
    if (
      this.chart &&
      (changedProps.has("data") || changedProps.has("options"))
    ) {
      this.chart.setOption(this.options, true);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated) {
      this._setupChart();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this.chart?.dispose();
    this.chart = undefined;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      letter-spacing: normal;
    }
    .container {
      display: flex;
      flex-direction: column;
      position: relative;
      max-height: var(--chart-max-height, 350px);
      height: 300px;
    }
    .chart-container {
      width: 100%;
      max-height: var(--chart-max-height, 350px);
      height: 300px;
    }
    .chart {
      height: 100%;
      width: 100%;
    }
  `;
}

customElements.define("chart-base", ChartBase);

class PVPCHourlyPricingCard extends LitElement {
  static get properties() {
    return {
      _config: {},
      hass: {},
    };
  }

  static get styles() {
    return css`
      ha-card {
        height: 100%;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

  static getConfigElement() {
    return document.createElement("pvpc-hourly-pricing-card-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass.states).find((eid) =>
      Object.keys(hass.states[eid].attributes).some(
        (aid) => aid == "attribution"
      )
    );
    return { entity: entity };
  }

  getCardSize() {
    return this.numberElements || 3;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error(
        'Please define a "Spain electricity hourly pricing (PVPC)" entity'
      );
    }

    this._config = config;

    this._setPVPCHourlyPricingObj();
  }

  shouldUpdate(changedProps) {
    if (!this._config) return false;

    if (changedProps.has("_config")) {
      return true;
    }

    if (this._config.entity) {
      const oldHass = changedProps.get("hass");
      if (oldHass) {
        return (
          oldHass.states[this._config.entity] !==
          this.hass.states[this._config.entity]
        );
      }
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (!this._config || !this.hass) return html``;

    this._setPVPCHourlyPricingObj();
    this.numberElements = 0;
    this.lang = this.hass.selectedLanguage || this.hass.language;

    if (!this.pvpcHourlyPricingObj) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found", {
            entity: this._config.entity || "[empty]",
          })}
        </hui-warning>
      `;
    }

    if (this.pvpcHourlyPricingObj.state === "unavailable") {
      return html`
        <ha-card class="unavailable" @click=${this._handleClick}>
          ${this.hass.localize("ui.panel.lovelace.warning.entity_unavailable", {
            entity: `${this.pvpcHourlyPricingObj.attributes?.friendly_name} (${this._config.entity})`,
          })}
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <h1 class="card-header" .title=${this._config.title}>
          ${this._config.title}
        </h1>
        <div class="card-content">
          ${this._config.show_current !== false ? this._renderCurrent() : ""}
          ${this._config.show_details !== false ? this._renderDetails() : ""}
          ${this._config.show_graph !== false ? this._renderGraph() : ""}
          ${this._config.show_info !== false ? this._renderInfo() : ""}
        </div>
      </ha-card>
    `;
  }

  _setPVPCHourlyPricingObj() {
    if (!this.hass) return;

    this.pvpcHourlyPricingObj =
      this._config.entity in this.hass.states
        ? this.hass.states[this._config.entity]
        : null;
    if (!this.pvpcHourlyPricingObj) return;

    this.despiction = this._getDespiction(this.pvpcHourlyPricingObj.attributes);

    this.injectionHourlyPricingObj =
      this._config.entity_injection in this.hass.states
        ? this.hass.states[this._config.entity_injection]
        : null;
    if (!this.injectionHourlyPricingObj) return;

    this._despictionInjection = this._getDespiction(
      this.injectionHourlyPricingObj.attributes
    );
  }

  _renderCurrent() {
    this.numberElements++;
    const tariffPeriod = this.pvpcHourlyPricingObj.attributes.period || "Error";
    const style = getComputedStyle(document.body);
    const iconColor = style.getPropertyValue(
      tariffPeriodIconColors[tariffPeriod]
    );

    return html`
      <div
        class="current tappable ${this.numberElements > 1 ? "spacer" : ""}"
        @click="${this._handleClick}"
      >
        <svg class="period-icon" viewBox="0 0 52 52">
          <circle fill="${iconColor}" r="25" cy="26" cx="26" />
          <path fill="#f9f9f9" d="${tariffPeriodIcons[tariffPeriod]}" />
        </svg>

        <span class="currentPrice"
          >${this._getFixedFloat(this.pvpcHourlyPricingObj.state)}</span
        >
        <span class="currentPriceUnit">
          ${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}</span
        >
      </div>
    `;
  }

  _renderDetails() {
    if (!this.despiction) {
      return html``;
    }

    const minPrice = this._getFixedFloat(this.despiction.minPrice);
    const minPriceFrom = this._getTimeString(
      new Date().setHours(this.despiction.minIndex, 0)
    );
    const minPriceTo = this._getTimeString(
      new Date().setHours(this.despiction.minIndex + 1, 0)
    );
    const maxPrice = this._getFixedFloat(this.despiction.maxPrice);
    const maxPriceFrom = this._getTimeString(
      new Date().setHours(this.despiction.maxIndex, 0)
    );
    const maxPriceTo = this._getTimeString(
      new Date().setHours(this.despiction.maxIndex + 1, 0)
    );
    const minPriceNextDay = this._getFixedFloat(
      this.despiction.minPriceNextDay
    );
    const minPriceFromNextDay = this._getTimeString(
      new Date().setHours(this.despiction.minIndexNextDay, 0)
    );
    const minPriceToNextDay = this._getTimeString(
      new Date().setHours(this.despiction.minIndexNextDay + 1, 0)
    );
    const maxPriceNextDay = this._getFixedFloat(
      this.despiction.maxPriceNextDay
    );
    const maxPriceFromNextDay = this._getTimeString(
      new Date().setHours(this.despiction.maxIndexNextDay, 0)
    );
    const maxPriceToNextDay = this._getTimeString(
      new Date().setHours(this.despiction.maxIndexNextDay + 1, 0)
    );

    this.numberElements++;

    return html`
      <ul
        class="details tappable ${this.numberElements > 1 ? "spacer" : ""}"
        @click="${this._handleClick}"
      >
        <li>
          <ha-icon icon="mdi:thumb-up-outline"></ha-icon>
          ${this._ll("minPrice")}
          ${minPrice}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}
          ${this._ll("from")} ${minPriceFrom} ${this._ll("to")} ${minPriceTo}
        </li>
        <li>
          <ha-icon icon="mdi:thumb-down-outline"></ha-icon>
          ${this._ll("maxPrice")}
          ${maxPrice}${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}
          ${this._ll("from")} ${maxPriceFrom} ${this._ll("to")} ${maxPriceTo}
        </li>
        ${this.despiction.minPriceNextDay
          ? html` <li>
                <ha-icon icon="mdi:thumb-up-outline"></ha-icon>
                ${this._ll("minPriceNextDay")}
                ${minPriceNextDay}${this.pvpcHourlyPricingObj.attributes
                  .unit_of_measurement}
                ${this._ll("from")} ${minPriceFromNextDay} ${this._ll("to")}
                ${minPriceToNextDay}
              </li>
              <li>
                <ha-icon icon="mdi:thumb-down-outline"></ha-icon>
                ${this._ll("maxPriceNextDay")}
                ${maxPriceNextDay}${this.pvpcHourlyPricingObj.attributes
                  .unit_of_measurement}
                ${this._ll("from")} ${maxPriceFromNextDay} ${this._ll("to")}
                ${maxPriceToNextDay}
              </li>`
          : ""}
      </ul>
    `;
  }

  _renderGraph() {
    if (!this.despiction) {
      return html``;
    }

    this.numberElements++;

    this._chartOptions = this._createGraphOptions();

    return html`
      <div class="clear ${this.numberElements > 1 ? "spacer" : ""}">
        <chart-base
          .data=${this._chartOptions.series}
          .options=${this._chartOptions}
        ></chart-base>
      </div>
    `;

    // <!-- <ha-chart-base
    //       id="Chart"
    //       .hass=${this.hass}
    //       .data=${this._chartData}
    //       .options=${this._chartOptions}
    //       .height=${this.height}
    //       style=${styleMap({ height: this.height })}
    //       external-hidden
    //       @dataset-hidden=${this._datasetHidden}
    //       @dataset-unhidden=${this._datasetUnhidden}
    //     ></ha-chart-base> -->
  }

  _renderInfo() {
    if (!this.despiction) {
      return html``;
    }

    this.numberElements++;

    if (!this._config.show_only_today && !this.despiction.minPriceNextDay) {
      return html`
        <div class="info clear ${this.numberElements > 1 ? "spacer" : ""}">
          ${this._ll("infoNoNextDay")}
        </div>
      `;
    } else {
      return html``;
    }
  }

  _createGraphOptions() {
    const data = this._getChartData();

    if (!this.despiction) return;

    const style = getComputedStyle(document.body);
    const textColor = style.getPropertyValue("--primary-text-color");
    const secondaryTextColor = style.getPropertyValue("--secondary-text-color");
    const disabledTextColor = style.getPropertyValue("--disabled-text-color");
    const splitLineColor = style.getPropertyValue("--divider-color");

    const now = new Date(new Date().setMinutes(0));
    const today = new Date();
    const tomorrow = new Date().setDate(today.getDate() + 1);

    const markPoint = {
      symbol: "triangle",
      symbolSize: 10,
      label: { show: false },
      data: [
        { type: "max", name: "Max", symbolOffset: [0, -10] },
        {
          type: "min",
          name: "Min",
          symbolOffset: [0, 10],
          symbolRotate: 180,
        },
      ],
    };
    const baseSeries = {
      type: "line",
      showSymbol: false,
      symbol: "circle",
      step: "end",
      markPoint: markPoint,
      cursor: "default",
      smooth: 0.4,
      smoothMonotone: "x",
      lineStyle: { width: 1.5 },
    };

    const options = {
      // TODO: get from https://github.com/home-assistant/frontend/blob/dev/src/common/color/colors.ts
      color: ["#4269d0", "#f4bd4a"],
      backgroundColor: "transparent",
      textStyle: {
        color: textColor,
        fontFamily: "Roboto, Noto, sans-serif",
      },
      title: {
        textStyle: { color: textColor },
        subtextStyle: { color: secondaryTextColor },
      },
      legend: {
        textStyle: { color: textColor },
        inactiveColor: disabledTextColor,
        pageIconColor: textColor,
        pageIconInactiveColor: disabledTextColor,
        pageTextStyle: {
          color: secondaryTextColor,
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: style.getPropertyValue("--card-background-color"),
        borderColor: splitLineColor,
        textStyle: { color: textColor, fontSize: 12 },
        axisPointer: {
          lineStyle: { color: style.getPropertyValue("--info-color") },
          crossStyle: { color: style.getPropertyValue("--info-color") },
        },
        formatter: (params) => {
          const hours = Math.min(Number(params[0].axisValue.split(":")[0]), 23);
          let tooltipContent = `${this._getCategoryHour(
            hours
          )} - ${this._getCategoryHour(hours + 1)}<br/>`;
          params.forEach((item) => {
            tooltipContent += `${item.marker} ${item.seriesName}: ${item.value} ${this.pvpcHourlyPricingObj.attributes.unit_of_measurement}<br/>`;
          });
          return tooltipContent;
        },
      },
      xAxis: {
        type: "category",
        data: data.categories,
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: true, color: textColor },
        splitLine: { show: true, lineStyle: { color: splitLineColor } },
        splitArea: { show: false },
      },
      yAxis: {
        type: "value",
        name: this.pvpcHourlyPricingObj.attributes.unit_of_measurement,
        min: (value) =>
          this._config.graph_baseline_zero
            ? 0
            : Math.floor(value.min * 10) / 10 - 0.05,
        axisLine: { show: true, lineStyle: { color: splitLineColor } },
        axisTick: { show: true, lineStyle: { color: splitLineColor } },
        axisLabel: { show: true, color: textColor },
        splitLine: { show: true, lineStyle: { color: splitLineColor } },
        splitArea: { show: false },
      },
      series: [
        Object.assign({}, baseSeries, {
          name: this._getDateString(today),
          data: data.prices,
          markArea: {
            itemStyle: { color: splitLineColor },
            data: [
              [
                { xAxis: this._getCategoryHour(now.getHours()) },
                { xAxis: this._getCategoryHour(now.getHours() + 1) },
              ],
            ],
          },
        }),
      ],
    };

    if (
      !this._config.show_only_today &&
      data.pricesTomorrow.some((value) => value !== 0)
    ) {
      options.series.push(
        Object.assign({}, baseSeries, {
          name: this._getDateString(tomorrow),
          data: data.pricesTomorrow,
        })
      );
    }

    if (data.injectionPrices.some((value) => value !== 0)) {
      options.series.push(
        Object.assign({}, baseSeries, {
          name: this._getDateString(today),
          data: data.injectionPrices,
          lineStyle: { type: "dotted" },
        })
      );
    }

    if (
      !this._config.show_only_today &&
      data.injectionPricesTomorrow.some((value) => value !== 0)
    ) {
      options.series.push(
        Object.assign({}, baseSeries, {
          name: this._getDateString(tomorrow),
          data: data.injectionPricesTomorrow,
          lineStyle: { type: "dotted" },
        })
      );
    }

    return options;
  }

  _getChartData() {
    const entity = this.hass.states[this._config.entity];
    if (!entity) return { categories: [], values: [] };
    const injectionEntity = this.hass.states[this._config.entity_injection];

    const attributes = entity.attributes;
    const injectionAttributes = injectionEntity
      ? injectionEntity.attributes
      : {};
    const categories = [];
    const prices = [];
    const pricesTomorrow = [];
    const injectionPrices = [];
    const injectionPricesTomorrow = [];

    for (let i = 0; i < 24; i++) {
      categories.push(this._getCategoryHour(i));
      prices.push(attributes[`price_${this._getPadStartNumber(i)}h`] || 0);
      pricesTomorrow.push(
        attributes[`price_next_day_${this._getPadStartNumber(i)}h`] || 0
      );
      injectionPrices.push(
        injectionAttributes[`price_${this._getPadStartNumber(i)}h`] || 0
      );
      injectionPricesTomorrow.push(
        injectionAttributes[`price_next_day_${this._getPadStartNumber(i)}h`] ||
          0
      );
    }

    categories.push(this._getCategoryHour(24));
    prices.push(prices[23]);
    pricesTomorrow.push(pricesTomorrow[23]);
    injectionPrices.push(injectionPrices[23]);
    injectionPricesTomorrow.push(injectionPricesTomorrow[23]);

    return {
      categories,
      prices,
      pricesTomorrow,
      injectionPrices,
      injectionPricesTomorrow,
    };
  }

  _getDespiction(attributes) {
    const today = new Date();

    let data = [];
    let dateTime = [];
    let prices = [];
    let pricesNextDay = [];

    for (let index = 0; index < 24; index++) {
      dateTime.push(new Date(today.setHours(index, 0)));
      let index_fixed = this._getPadStartNumber(index);
      prices.push(attributes["price_" + index_fixed + "h"]);
      pricesNextDay.push(attributes["price_next_day_" + index_fixed + "h"]);
    }

    dateTime.push(new Date(today.setHours(24, 0)));
    prices.push(prices[23]);
    pricesNextDay.push(pricesNextDay[23]);

    let minPrice = Math.min.apply(null, prices.filter(Number));
    let maxPrice = Math.max.apply(null, prices.filter(Number));
    let minPriceNextDay = Math.min.apply(null, pricesNextDay.filter(Number));
    let maxPriceNextDay = Math.max.apply(null, pricesNextDay.filter(Number));

    data.dateTime = dateTime;
    data.prices = prices;
    data.pricesNextDay = pricesNextDay;
    data.minPrice = isFinite(minPrice) ? minPrice : NaN;
    data.maxPrice = isFinite(maxPrice) ? maxPrice : NaN;
    data.minIndex = prices.indexOf(data.minPrice);
    data.maxIndex = prices.indexOf(data.maxPrice);
    data.minPriceNextDay = isFinite(minPriceNextDay) ? minPriceNextDay : NaN;
    data.maxPriceNextDay = isFinite(maxPriceNextDay) ? maxPriceNextDay : NaN;
    data.minIndexNextDay = pricesNextDay.indexOf(data.minPriceNextDay);
    data.maxIndexNextDay = pricesNextDay.indexOf(data.maxPriceNextDay);

    return data;
  }

  _getDateString(datetime) {
    return new Date(datetime).toLocaleDateString(this.lang, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  _getTimeString(datetime) {
    return new Date(datetime).toLocaleTimeString(this.lang, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  _getFixedFloat(number) {
    return parseFloat(number).toFixed(5);
  }

  _getCategoryHour(hours) {
    const padHours = this._getPadStartNumber(hours);
    return `${padHours}:00`;
  }

  _getPadStartNumber(number) {
    return String(number).padStart(2, "0");
  }

  _handleClick() {
    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }

  _ll(str) {
    return locale[this.lang]?.[str] ?? locale.en[str];
  }
}

customElements.define("pvpc-hourly-pricing-card", PVPCHourlyPricingCard);

export class PVPCHourlyPricingCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    this.lang = this.hass.selectedLanguage || this.hass.language;

    const schema = [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "sensor" } },
      },
      {
        name: "entity_injection",
        required: false,
        selector: { entity: { domain: "sensor" } },
      },
      {
        name: "",
        type: "expandable",
        title: this.hass.localize(
          "ui.panel.lovelace.editor.card.tile.appearance"
        ),
        schema: [
          { name: "title", selector: { text: {} } },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "show_current", selector: { boolean: {} } },
              { name: "show_details", selector: { boolean: {} } },
              { name: "show_graph", selector: { boolean: {} } },
              { name: "show_info", selector: { boolean: {} } },
              { name: "show_only_today", selector: { boolean: {} } },
              { name: "graph_baseline_zero", selector: { boolean: {} } },
            ],
          },
        ],
      },
    ];

    const data = {
      show_current: true,
      show_details: true,
      show_graph: true,
      show_info: true,
      show_only_today: false,
      graph_baseline_zero: false,
      ...this._config,
    };

    return html`<ha-form
      .hass=${this.hass}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this._computeLabelCallback}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }

  _valueChanged = (ev) => {
    const config = ev.detail.value;
    fireEvent(this, "config-changed", { config });
  };

  _computeLabelCallback = (schema) => {
    if (this.hass) {
      switch (schema.name) {
        case "title":
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.title`
          );
        case "entity":
          return `${this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.entity"
          )} (${this.hass.localize(
            "ui.panel.lovelace.editor.card.config.required"
          )})`;
        default:
          return this._ll(schema.name);
      }
    } else {
      return "";
    }
  };

  _ll(str) {
    return locale[this.lang]?.[str] ?? locale.en[str];
  }
}

customElements.define(
  "pvpc-hourly-pricing-card-editor",
  PVPCHourlyPricingCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "pvpc-hourly-pricing-card",
  name: "PVPC Hourly Pricing",
  preview: true,
  description:
    "The PVPC Hourly Pricing card allows you to display propertly the PVPC Hourly Pricing entity.",
  documentationURL: "https://github.com/danimart1991/pvpc-hourly-pricing-card",
});
