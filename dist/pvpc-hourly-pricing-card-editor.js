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

const locale = {
  da: {
    optionName: 'Navn (valgfrit)',
    optionEntity: 'Enhed (påkrævet)',
    optionShowCurrent: 'Vis nuværende status',
    optionShowDetails: 'Vis detaljer',
    optionShowGraph: 'Vis graf',
    optionShowInfo: 'Vis information'
  },
  de: {
    optionName: 'Name (optional)',
    optionEntity: 'Entity (Erforderlich)',
    optionShowCurrent: 'Aktuellen Status anzeigen',
    optionShowDetails: 'Details anzeigen',
    optionShowGraph: 'Grafik anzeigen',
    optionShowInfo: 'Informationen anzeigen'
  },
  en: {
    optionName: 'Name (Optional)',
    optionEntity: 'Entity (Required)',
    optionShowCurrent: 'Show Current State',
    optionShowDetails: 'Show Details',
    optionShowGraph: 'Show Graph',
    optionShowInfo: 'Show Info'
  },
  es: {
    optionName: 'Nombre (Opcional)',
    optionEntity: 'Entidad (Necesario)',
    optionShowCurrent: 'Mostrar Estado Actual',
    optionShowDetails: 'Mostrar Detalles',
    optionShowGraph: 'Mostrar Gráfico',
    optionShowInfo: 'Mostrar Información'
  },
  fr: {
    optionName: 'Nom (Facultatif)',
    optionEntity: 'Entity (Required)',
    optionShowCurrent: "Afficher l'état actuel",
    optionShowDetails: 'Afficher les détails',
    optionShowGraph: 'Afficher le graphique',
    optionShowInfo: 'Afficher les informations'
  },
  nl: {
    optionName: 'Naam (optioneel)',
    optionEntity: 'Entiteit (vereist)',
    optionShowCurrent: 'Toon huidige status',
    optionShowDetails: 'Details weergeven',
    optionShowGraph: 'Show Graph',
    optionShowInfo: 'Informatie weergeven'
  },
  ru: {
    optionName: 'Имя (необязательно)',
    optionEntity: 'Entity (обязательно)',
    optionShowCurrent: 'Показать текущий статус',
    optionShowDetails: 'Показать детали',
    optionShowGraph: 'Показать график',
    optionShowInfo: 'Показать информацию'
  },
  sv: {
    optionName: 'Namn (valfritt)',
    optionEntity: 'Enhet (obligatoriskt)',
    optionShowCurrent: 'Visa aktuell status',
    optionShowDetails: 'Visa detaljer',
    optionShowGraph: 'Visa graf',
    optionShowInfo: 'Visa information'
  }
};

const LitElement = Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

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
          <div>
            <ha-switch .checked=${this._current} .configValue="${'current'}" @change="${this._valueChanged}"></ha-switch>
            <label class="mdc-label">${this.ll('optionShowCurrent')}</label>
          </div>
          <div>
            <ha-switch .checked=${this._details} .configValue="${'details'}" @change="${this._valueChanged}" ></ha-switch>
            <label class="mdc-label">${this.ll('optionShowDetails')}</label>
          </div>
        </div>
        <div class="side-by-side">
          <div>
            <ha-switch .checked=${this._graph} .configValue="${'graph'}" @change="${this._valueChanged}" ></ha-switch>
            <label class="mdc-label">${this.ll('optionShowGraph')}</label>
          </div>
          <div>
            <ha-switch .checked=${this._info} .configValue="${'info'}" @change="${this._valueChanged}" ></ha-switch>
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
