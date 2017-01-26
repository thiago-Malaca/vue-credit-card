<template>

  <div class="jp-card-container">
    <div class="jp-card" :class="classCard">
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
import Payment from '../../node_modules/payment/lib'
// import Card from '../js/card'

let options = {
  formatting: false
}

// let teste = new Card({
//   form: document.querySelector('form'),
//   container: '.card-wrapper'
// })

// console.log('card', teste)

export default {
  name: 'Card',
  props: ['value'],
  data () {
    return {
      isSafari: false,
      isIE10: false,
      isIE11: false
    }
  },
  computed: {
    classCard: function () {
      return {
        'jp-card-safari': this.isSafari,
        'jp-card-ie-10': this.isIE10,
        'jp-card-ie-11': this.isIE11
      }
    }
  },
  created () {
    if (options.formatting) {
      if (!Payment.fns.validateCardCVC(this.value.cvc)) console.error('CVC number isn\'t valid:', this.value.cvc)
      if (!Payment.fns.validateCardExpiry(this.value.expiry)) console.error('Expiration date isn\'t valid:', this.value.expiry)
      if (!Payment.fns.validateCardNumber(this.value.number)) console.error('Card number isn\'t valid:', this.value.number)
    }

    // [TODO]Implement in the future width.
    // if (options.width) {
    //   let $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0]
    //   let baseWidth = parseInt($cardContainer.clientWidth || window.getComputedStyle($cardContainer).width)
    //   $cardContainer.style.transform = `scale(${this.options.width / baseWidth})`
    // }

    // safari can't handle transparent radial gradient right now
    if (__guard__(navigator, x => x.userAgent)) {
      let ua = navigator.userAgent.toLowerCase()
      if ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1)) {
        this.isSafari = true
      }
    }
    if (/MSIE 10\./i.test(navigator.userAgent)) {
      this.isIE10 = true
    }
    // ie 11 does not support conditional compilation, use user agent instead
    if (/rv:11.0/i.test(navigator.userAgent)) {
      this.isIE11 = true
    }
  }
}
function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
</script>

<style lang="scss">
  @import "../scss/card"

</style>