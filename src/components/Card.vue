<template>

  <div class="jp-card-container">
    <div class="jp-card">
      <div class="jp-card-front">
        <div class="jp-card-logo jp-card-elo">
        <div class="e">e</div>
        <div class="l">l</div>
        <div class="o">o</div>
        </div>
        <div class="jp-card-logo jp-card-visa">visa</div>
        <div class="jp-card-logo jp-card-mastercard">MasterCard</div>
        <div class="jp-card-logo jp-card-maestro">Maestro</div>
        <div class="jp-card-logo jp-card-amex"></div>
        <div class="jp-card-logo jp-card-discover">discover</div>
        <div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>
        <div class="jp-card-lower">
          <div class="jp-card-shiny"></div>
          <div class="jp-card-cvc jp-card-display">{{ cvc }}</div>
          <div class="jp-card-number jp-card-display">{{ number }}</div>
          <div class="jp-card-name jp-card-display">{{ name }}</div>
          <div class="jp-card-expiry jp-card-display" :data-before="monthYear" :data-after="validDate">{{ expiry }}</div>
        </div>
      </div>
      <div class="jp-card-back">
        <div class="jp-card-bar"></div>
        <div class="jp-card-cvc jp-card-display">{{ cvc }}</div>
        <div class="jp-card-shiny"></div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss">
  @import "../scss/card"

</style>