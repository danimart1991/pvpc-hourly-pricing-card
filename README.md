# PVPC Hourly Pricing Card

Home Assistant Lovelace custom card to use with [Spain electricity hourly pricing (PVPC) integration](https://www.home-assistant.io/integrations/pvpc_hourly_pricing/).

![Card Example](docs/images/card-example.jpg)

> This card only works with a [previously configured Spain electricity hourly pricing (PVPC) integration](https://www.danielmartingonzalez.com/pvpc-tariff-prices-in-home-assistant/) in Home Assistant.

Based on [Lovelace Weather Card with Chart](https://github.com/sgttrs/lovelace-weather-card-chart) by [Yevgeniy Prokopenko](https://github.com/sgttrs).

## Features

- Compatible with all rates.
- Actual price close-up.
- Graph with the prices of the current day.
- Graph with the prices of the next day when you are available.
- Minimum and maximum of the current and next day.
- Icon indicating the current pricing period.

## Installation

Follow this [guide](https://www.danielmartingonzalez.com/installing-lovelace-plugins).

```yaml
resources:
  url: /local/pvpc-hourly-pricing-card.js?v=0.0.1
  type: module
```

## Options

| Name | Type | Default | Description |
|---|---|---|---|
| type | string | **Required** | `custom:pvpc-hourly-pricing-card` |
| entity_id | string | **Required** | Spain electricity hourly pricing (PVPC) entity |
| title | string | Optional | Title of the card |

## Example

```yaml
cards:
  - type: custom:pvpc-hourly-pricing-card
    title: "PVPC 2.0 DHA"
    entity_id: sensor.pvpc_2_0_dha
```
