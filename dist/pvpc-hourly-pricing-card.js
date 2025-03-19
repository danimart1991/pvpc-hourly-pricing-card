const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const { html, css } = LitElement.prototype;

const locale = {
  ca: {
    editor_show_current: "Mostrar estat actual",
    editor_show_details: "Mostrar detalls",
    editor_show_graph: "Mostrar gràfic",
    editor_show_only_today: "Mostra solament dia actual",
    editor_graph_baseline_zero: "Línia base zero (gràfic)",
    editor_entity_injection: "Entitat preu injecció (opcional)",
  },
  da: {
    editor_show_current: "Vis nuværende status",
    editor_show_details: "Vis detaljer",
    editor_show_graph: "Vis graf",
    editor_show_only_today: "Vis kun den aktuelle dag",
    editor_graph_baseline_zero: "Nul baseline (graf)",
    editor_entity_injection: "Injektionsprisenhed (valgfrit)",
  },
  de: {
    editor_show_current: "Aktuellen Status anzeigen",
    editor_show_details: "Details anzeigen",
    editor_show_graph: "Grafik anzeigen",
    editor_show_only_today: "Nur aktuellen tag anzeigen",
    editor_graph_baseline_zero: "Null-basislinie (grafik)",
    editor_entity_injection: "Injektionspreiseinheit (optional)",
  },
  en: {
    editor_show_current: "Show current state",
    editor_show_details: "Show details",
    editor_show_graph: "Show graph",
    editor_show_only_today: "Show only current day",
    editor_graph_baseline_zero: "Baseline zero (graph)",
    editor_entity_injection: "Injection price entity (optional)",
  },
  es: {
    editor_show_current: "Mostrar estado actual",
    editor_show_details: "Mostrar detalles",
    editor_show_graph: "Mostrar gráfico",
    editor_show_only_today: "Mostrar solo día actual",
    editor_graph_baseline_zero: "Línea base cero (gráfico)",
    editor_entity_injection: "Entidad precio inyección (opcional)",
  },
  fr: {
    editor_show_current: "Afficher l'état actuel",
    editor_show_details: "Afficher les détails",
    editor_show_graph: "Afficher le graphique",
    editor_show_only_today: "Afficher uniquement le jour en cours",
    editor_graph_baseline_zero: "Référence zéro (graphique)",
    editor_entity_injection: "Entité de prix d'injection (facultatif)",
  },
  nl: {
    editor_show_current: "Toon huidige status",
    editor_show_details: "Details weergeven",
    editor_show_graph: "Show graph",
    editor_show_only_today: "Alleen huidige dag weergeven",
    editor_graph_baseline_zero: "Nul basislijn (graph)",
    editor_entity_injection: "Injectieprijsentiteit (optioneel)",
  },
  pt: {
    editor_show_current: "Mostrar estado actual",
    editor_show_details: "Mostrar detalhes",
    editor_show_graph: "Mostrar gráfico",
    editor_show_only_today: "Mostrar apenas o dia atual",
    editor_graph_baseline_zero: "Linha de base zero (gráfico)",
    editor_entity_injection: "Entidade de preço de injeção (opcional)",
  },
  ru: {
    editor_show_current: "Показать текущий статус",
    editor_show_details: "Показать детали",
    editor_show_graph: "Показать график",
    editor_show_only_today: "Показать только текущий день",
    editor_graph_baseline_zero: "Нулевая базовая линия (график)",
    editor_entity_injection: "Объект цены впрыска (необязательно)",
  },
  sk: {
    editor_show_current: "Zobraziť aktuálny stav",
    editor_show_details: "Zobraziť podrobnosti",
    editor_show_graph: "Zobraziť graf",
    editor_show_only_today: "Visa endast aktuell dag",
    editor_graph_baseline_zero: "Východisková nula (graf)",
    editor_entity_injection: "Injektionsprisenhet (valfritt)",
  },
  sv: {
    editor_show_current: "Visa aktuell status",
    editor_show_details: "Visa detaljer",
    editor_show_graph: "Visa graf",
    editor_show_only_today: "Zobraziť iba aktuálny deň",
    editor_graph_baseline_zero: "Noll baslinje (graf)",
    editor_entity_injection: "Subjekt ceny vstrekovania (voliteľné)",
  },
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
      <div class="chart-container">
        <div class="chart"></div>
      </div>
    `;
  }

  firstUpdated() {
    this._setupChart();
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

  async _setupChart() {
    if (!window.echarts) {
      await import("https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js");
    }

    const container = this.shadowRoot.querySelector(".chart-container");
    const chart = this.shadowRoot.querySelector(".chart");
    this.chart = echarts.init(chart);

    if (this.options) {
      this.chart.setOption(this.options, true);
    }

    this._resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() =>
        this.chart?.resize({
          width: this.clientWidth + 16,
          height: Math.max(this.clientWidth / 2, 200),
        })
      );
    });
    this._resizeObserver.observe(container);
  }

  static styles = css`
    .chart-container {
      margin-bottom: -36px;
    }
    .chart {
      width: 100%;
      height: 100%;
    }
  `;
}

customElements.define("chart-base", ChartBase);

class PVPCHourlyPricingCard extends LitElement {
  // TODO: get from https://github.com/home-assistant/frontend/blob/dev/src/common/color/colors.ts
  static _colors = ["#4269d0", "#f4bd4a"];

  static _period_icons_colors = {
    Error: "--error-color",
    P3: "--success-color",
    P2: "--warning-color",
    P1: "--error-color",
  };

  static _period_icons = {
    Error:
      "m35.07709,11.54561l-0.71432,29.64445l-4.67059,0l-0.76926,-29.64445l6.15417,0zm-0.27475,40.90879l-5.60469,0l0,-5.79702l5.60469,0l0,5.79702z",
    P3: "m1.01231,15.65096a33.02052,33.02052 0 0 0 -0.81004,2.49465l11.4153,0l20.46756,30.20342l19.96967,-30.20342l11.74292,0a33.02052,33.02052 0 0 0 -0.83066,-2.49465l-12.41108,0l-18.47085,27.85077l-18.47085,-27.85077l-12.60197,0z",
    P2: "m38.49444,19.96114l-12.85128,19.85659l-6.83253,-9.02824l-18.81502,0a32.04692,32.04692 0 0 0 -0.04263,1.21679a32.04692,32.04692 0 0 0 0.06007,1.20423l17.68842,0l7.94166,10.82839l12.85134,-19.85913l6.83502,9.03074l18.67486,0a32.04692,32.04692 0 0 0 0.04263,-1.20423a32.04692,32.04692 0 0 0 -0.06007,-1.21679l-17.54821,0l-7.94416,-10.82839l-0.00005,0.00005l-0.00005,0l-0.00003,0z",
    P1: "m0.79455,48.46392a33.25256,33.25256 0 0 1 -0.81573,-2.51218l11.49551,0l20.61139,-30.41566l20.11,30.41566l11.82544,0a33.25256,33.25256 0 0 1 -0.8365,2.51218l-12.4983,0l-18.60065,-28.04648l-18.60065,28.04648l-12.69053,0z",
  };

  static get properties() {
    return {
      _config: {},
      hass: {},
    };
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        height: 100%;
      }
      ha-card {
        outline: none;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
      }
      .custom-card-header {
        padding: 0px 16px 0px;
      }
      .custom-card-header .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tappable {
        cursor: pointer;
      }

      .current {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .current-icon {
        height: 64px;
        width: 64px;
        padding: 12px 0px 12px 24px;
      }
      .current-info {
        display: block;
        overflow: hidden;
        padding: 12px 16px;
        flex-grow: 1;
        text-align: var(--float-end);
      }
      .current-info .primary {
        justify-self: end;
        font-size: 28px;
        line-height: 1.2;
      }
      .current-info .secondary {
        font-size: 14px;
        line-height: 1;
        justify-self: end;
        color: var(--secondary-text-color);
      }

      .details-columns {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      .details-column {
        flex: 1;
        min-width: 162.5px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
      }

      .detail-content {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        pointer-events: none;
        gap: 10px;
        width: 100%;
      }
      ha-tile-icon {
        --tile-icon-color: var(--tile-color);
        position: relative;
        padding: 6px;
        margin: -6px;
      }
      ha-tile-badge {
        position: absolute;
        top: 3px;
        right: 3px;
        inset-inline-end: 3px;
        inset-inline-start: initial;
      }
      ha-tile-info {
        position: relative;
        min-width: 0;
        transition: background-color 180ms ease-in-out;
        box-sizing: border-box;
      }
    `;
  }

  static getConfigElement() {
    return document.createElement("pvpc-hourly-pricing-card-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass.states).find((eid) =>
      hass.states[eid].attributes?.attribution?.includes("REE")
    );
    return { entity: entity };
  }

  getGridOptions() {
    return {
      columns: "full",
      rows: "auto",
      max_columns: 12,
      min_columns: 6,
      min_rows: 8,
      max_rows: 8,
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error(
        'Please define a "Spain electricity hourly pricing (PVPC)" entity.'
      );
    }

    this._config = config;
  }

  shouldUpdate(changed_props) {
    if (!this._config) return false;

    if (changed_props.has("_config")) {
      return true;
    }

    if (this._config.entity) {
      const oldHass = changed_props.get("hass");
      if (oldHass) {
        return (
          oldHass.states[this._config.entity] !==
          this.hass.states[this._config.entity]
        );
      }
      return true;
    }
    return false;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    this._entity =
      this._config.entity in this.hass.states
        ? this.hass.states[this._config.entity]
        : null;
    this._entity_injection =
      this._config.entity_injection in this.hass.states
        ? this.hass.states[this._config.entity_injection]
        : null;

    if (!this._entity) {
      return html`
        <ha-alert alert-type="warning">
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found", {
            entity: this._config.entity || "[empty]",
          })}
        </ha-alert>
      `;
    }

    this._unit_of_measurement =
      this._entity.attributes.unit_of_measurement || "€/kWh";

    this._number_elements = 0;

    return html`
      <ha-card tabindex="0">
        <h1 class="card-header custom-card-header">
          <div class="name">${this._config.title}</div>
        </h1>
        ${this._config.show_current !== false ? this._renderCurrent() : ""}
        ${this._config.show_details !== false ? this._renderDetails() : ""}
        ${this._config.show_graph !== false ? this._renderGraph() : ""}
      </ha-card>
    `;
  }

  _renderCurrent() {
    if (!this._entity || !this.hass) return html``;

    this._number_elements++;

    const period = this._entity.attributes?.period || "Error";
    const style = getComputedStyle(document.body);
    const icon_color = style.getPropertyValue(
      PVPCHourlyPricingCard._period_icons_colors[period]
    );

    return html`
      <div class="current">
        <div class="current-icon">
          <svg
            class="tappable"
            @click="${this._handleClick}"
            viewBox="0 0 64 64"
          >
            <circle fill="${icon_color}" r="32" cy="32" cx="32" />
            <path
              fill="#f9f9f9"
              d="${PVPCHourlyPricingCard._period_icons[period]}"
            />
          </svg>
        </div>
        <div class="current-info">
          <div class="primary tappable" @click="${this._handleClick}">
            ${this.hass.formatEntityState(this._entity)}
          </div>
          ${this._entity_injection
            ? html`
                <div
                  class="secondary tappable"
                  @click="${this._handleClickInjection}"
                >
                  ${this.hass.formatEntityState(this._entity_injection)}
                </div>
              `
            : html``}
        </div>
      </div>
    `;
  }

  _renderDetails() {
    if (!this._entity || !this.hass) return html``;

    this._number_elements++;

    const today_min = this._renderDetail(
      PVPCHourlyPricingCard._colors[0],
      "mdi:triangle-down",
      this._entity.attributes.min_price,
      this._entity.attributes.min_price_at
    );

    const today_max = this._renderDetail(
      PVPCHourlyPricingCard._colors[0],
      "mdi:triangle",
      this._entity.attributes.max_price,
      this._entity.attributes.max_price_at
    );

    const tomorrow_min = this._renderDetail(
      PVPCHourlyPricingCard._colors[1],
      "mdi:triangle-down",
      this._entity.attributes["min_price (next day)"],
      this._entity.attributes["min_price_at (next day)"]
    );

    const tomorrow_max = this._renderDetail(
      PVPCHourlyPricingCard._colors[1],
      "mdi:triangle",
      this._entity.attributes["max_price (next day)"],
      this._entity.attributes["max_price_at (next day)"]
    );

    const today_min_injection = this._renderDetail(
      PVPCHourlyPricingCard._colors[0],
      "mdi:triangle-down-outline",
      this._entity_injection?.attributes.min_price,
      this._entity_injection?.attributes.min_price_at
    );

    const today_max_injection = this._renderDetail(
      PVPCHourlyPricingCard._colors[0],
      "mdi:triangle-outline",
      this._entity_injection?.attributes.max_price,
      this._entity_injection?.attributes.max_price_at
    );

    const tomorrow_min_injection = this._renderDetail(
      PVPCHourlyPricingCard._colors[1],
      "mdi:triangle-down-outline",
      this._entity_injection?.attributes["min_price (next day)"],
      this._entity_injection?.attributes["min_price_at (next day)"]
    );

    const tomorrow_max_injection = this._renderDetail(
      PVPCHourlyPricingCard._colors[1],
      "mdi:triangle-outline",
      this._entity_injection?.attributes["max_price (next day)"],
      this._entity_injection?.attributes["max_price_at (next day)"]
    );

    return html`
      <div>
        <div class="details-columns tappable" @click="${this._handleClick}">
          <div class="details-column">
            ${today_min} ${!this._config.show_only_today ? today_max : html``}
          </div>
          <div class="details-column">
            ${!this._config.show_only_today
              ? html` ${tomorrow_min} ${tomorrow_max} `
              : today_max}
          </div>
        </div>
        ${this._entity_injection
          ? html`
              <div
                class="details-columns tappable"
                @click="${this._handleClickInjection}"
              >
                <div class="details-column">
                  ${today_min_injection}
                  ${!this._config.show_only_today
                    ? today_max_injection
                    : html``}
                </div>
                <div class="details-column">
                  ${!this._config.show_only_today
                    ? html`
                        ${tomorrow_min_injection} ${tomorrow_max_injection}
                      `
                    : today_max_injection}
                </div>
              </div>
            `
          : html``}
      </div>
    `;
  }

  _renderDetail(color, icon, price, hour) {
    const primary_text = price
      ? `${this._formatNumber(price)} ${this._unit_of_measurement}`
      : this.hass.localize("state.default.unavailable");
    const secondary_text = hour
      ? `${this._formatHour(hour)} - ${this._formatHour(hour + 1)}`
      : null;
    return html`
      <div class="detail-content">
        <ha-tile-icon>
          <ha-state-icon
            slot="icon"
            style="color: ${color}"
            .icon=${icon}
            .hass=${this.hass}
          ></ha-state-icon>
        </ha-tile-icon>
        <ha-tile-info
          .primary="${primary_text}"
          .secondary="${secondary_text}"
        ></ha-tile-info>
      </div>
    `;
  }

  _renderGraph() {
    if (!this._entity || !this.hass) return html``;

    this._number_elements++;

    const chart_options = this._createGraphOptions();

    return html`
      <chart-base
        .data=${chart_options.series}
        .options=${chart_options}
      ></chart-base>
    `;
  }

  _createGraphOptions() {
    const data = this._getChartData();

    const style = getComputedStyle(document.body);
    const primary_text_color = style.getPropertyValue("--primary-text-color");
    const secondary_text_color = style.getPropertyValue(
      "--secondary-text-color"
    );
    const disabled_text_color = style.getPropertyValue("--disabled-text-color");
    const split_line_color = style.getPropertyValue("--divider-color");

    const now = new Date(new Date().setMinutes(0));
    const today = new Date();
    const tomorrow = new Date().setDate(today.getDate() + 1);

    const mark_point = {
      symbol: "triangle",
      symbolSize: 10,
      label: { show: false },
      data: [
        // TODO: x-offset based on space/2 between each category
        { type: "max", name: "Max", symbolOffset: [0, -10] },
        {
          type: "min",
          name: "Min",
          symbolOffset: [0, 10],
          symbolRotate: 180,
        },
      ],
    };
    const base_series = {
      type: "line",
      showSymbol: false,
      symbol: "circle",
      step: "end",
      markPoint: mark_point,
      cursor: "default",
      smooth: 0.4,
      smoothMonotone: "x",
      lineStyle: { width: 1.5 },
    };

    const options = {
      color: PVPCHourlyPricingCard._colors,
      backgroundColor: "transparent",
      textStyle: {
        color: primary_text_color,
        fontFamily: "Roboto, Noto, sans-serif",
      },
      title: {
        textStyle: { color: primary_text_color },
        subtextStyle: { color: secondary_text_color },
      },
      legend: {
        top: 8,
        itemHeight: 20,
        itemWidth: 20,
        lineStyle: { width: 0, inactiveWidth: 0 },
        textStyle: { color: primary_text_color },
        inactiveColor: disabled_text_color,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: style.getPropertyValue("--card-background-color"),
        borderColor: split_line_color,
        textStyle: { color: primary_text_color, fontSize: 12 },
        axisPointer: {
          lineStyle: { color: style.getPropertyValue("--info-color") },
          crossStyle: { color: style.getPropertyValue("--info-color") },
        },
        formatter: (params) => {
          const hour = Math.min(Number(params[0].axisValue.split(":")[0]), 23);
          let tooltipContent = `${this._formatHour(hour)} - ${this._formatHour(
            hour + 1
          )}<br/>`;
          params.forEach((item) => {
            tooltipContent += `${item.marker} ${item.seriesName}: ${item.value} ${this._unit_of_measurement}<br/>`;
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
        axisLabel: { show: true, color: primary_text_color },
        splitLine: { show: true, lineStyle: { color: split_line_color } },
        splitArea: { show: false },
      },
      yAxis: {
        type: "value",
        name: this._unit_of_measurement,
        min: (_) => (this._config.graph_baseline_zero ? 0 : null),
        axisLine: { show: true, lineStyle: { color: split_line_color } },
        axisTick: { show: true, lineStyle: { color: split_line_color } },
        axisLabel: { show: true, color: primary_text_color },
        splitLine: { show: true, lineStyle: { color: split_line_color } },
        splitArea: { show: false },
      },
      series: [
        Object.assign({}, base_series, {
          name: this._formatDate(today),
          data: data.prices_today,
          markArea: {
            itemStyle: { color: split_line_color },
            data: [
              [
                { xAxis: this._formatHour(now.getHours()) },
                { xAxis: this._formatHour(now.getHours() + 1) },
              ],
            ],
          },
        }),
      ],
    };

    if (
      !this._config.show_only_today &&
      data.prices_tomorrow.some((value) => value)
    ) {
      options.series.push(
        Object.assign({}, base_series, {
          name: this._formatDate(tomorrow),
          data: data.prices_tomorrow,
        })
      );
    }

    if (data.injection_prices.some((value) => value)) {
      options.series.push(
        Object.assign({}, base_series, {
          name: this._formatDate(today),
          data: data.injection_prices,
          lineStyle: { type: "dotted" },
        })
      );
    }

    if (
      !this._config.show_only_today &&
      data.injection_prices_tomorrow.some((value) => value)
    ) {
      options.series.push(
        Object.assign({}, base_series, {
          name: this._formatDate(tomorrow),
          data: data.injection_prices_tomorrow,
          lineStyle: { type: "dotted" },
        })
      );
    }

    return options;
  }

  _getChartData() {
    if (!this._entity) return { categories: [], values: [] };

    const attributes = this._entity.attributes;
    const injection_attributes = this._entity_injection
      ? this._entity_injection.attributes
      : {};

    const categories = [];
    const prices = [];
    const prices_tomorrow = [];
    const injection_prices = [];
    const injection_prices_tomorrow = [];

    for (let i = 0; i < 24; i++) {
      categories.push(this._formatHour(i));
      const hour = this._getPadStartNumber(i);
      prices.push(attributes[`price_${hour}h`] || null);
      prices_tomorrow.push(attributes[`price_next_day_${hour}h`] || null);
      injection_prices.push(injection_attributes[`price_${hour}h`] || null);
      injection_prices_tomorrow.push(
        injection_attributes[`price_next_day_${hour}h`] || null
      );
    }

    categories.push(this._formatHour(24));
    prices.push(prices[23]);
    prices_tomorrow.push(prices_tomorrow[23]);
    injection_prices.push(injection_prices[23]);
    injection_prices_tomorrow.push(injection_prices_tomorrow[23]);

    return {
      categories,
      prices_today: prices,
      prices_tomorrow: prices_tomorrow,
      injection_prices: injection_prices,
      injection_prices_tomorrow: injection_prices_tomorrow,
    };
  }

  _formatDate(value, language) {
    if (!language) {
      if (this.hass?.locale?.date_format === "language") {
        language = this.hass.locale.language;
      } else {
        language = undefined;
      }
    }

    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(value);
  }

  _formatNumber(value, language) {
    if (!language) {
      if (this.hass?.locale?.number_format === "language") {
        language = this.hass.locale.language;
      } else {
        language = undefined;
      }
    }

    return new Intl.NumberFormat(language, {
      maximumFractionDigits: 5,
      minimumFractionDigits: 5,
    }).format(value);
  }

  _formatHour(index) {
    const pad_hours = this._getPadStartNumber(index);
    return `${pad_hours}:00`;
  }

  _getPadStartNumber(number) {
    return String(number).padStart(2, "0");
  }

  _handleClick() {
    fireEvent(this, "hass-more-info", { entityId: this._config.entity });
  }

  _handleClickInjection() {
    fireEvent(this, "hass-more-info", {
      entityId: this._config.entity_injection,
    });
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
          const editor_translation_key = `editor_${schema.name}`;
          return (
            locale[this.lang]?.[editor_translation_key] ??
            locale.en[editor_translation_key]
          );
      }
    } else {
      return "";
    }
  };
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
