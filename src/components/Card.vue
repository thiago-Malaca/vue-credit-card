<template>


<div>
  <p>Teste: {{toInvert}}</p>
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
          <div class="jp-card-cvc jp-card-display" :class="classDisplay['cvc']">{{ display.cvc }}</div>
          <div class="jp-card-number jp-card-display" :class="classDisplay['number']">{{ display.number }}</div>
          <div class="jp-card-name jp-card-display" :class="classDisplay['name']">{{ display.name }}</div>
          <div class="jp-card-expiry jp-card-display" :class="classDisplay['expiry']" :data-before="monthYear" :data-after="validDate">{{ display.expiry }}</div>
        </div>
      </div>
      <div class="jp-card-back">
        <div class="jp-card-bar"></div>
        <div class="jp-card-cvc jp-card-display" :class="classDisplay['cvc']">{{ display.cvc }}</div>
        <div class="jp-card-shiny"></div>
      </div>
    </div>
  </div>
  <slot></slot>
</div>

</template>

<script>
import Vue from 'vue'
import Payment from '../../node_modules/payment/lib'
// import Card from '../js/card'

let options = {
  formatting: false,
  cardTypes: [
    'amex',
    'dankort',
    'dinersclub',
    'discover',
    'jcb',
    'laser',
    'maestro',
    'mastercard',
    'unionpay',
    'visa',
    'visaelectron',
    'elo'
  ],
  placeholders: {
    number: '•••• •••• •••• ••••',
    cvc: '•••',
    expiry: '••/••',
    name: 'Full Name'
  }
}

let classDisplay = {}
let stateCard = {}

Vue.directive('card-focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    const toggleFocusState = (type) => () => {
      Vue.set(classDisplay, el.name, {
        'jp-card-focused': type === 'focus'
      })
      Vue.set(stateCard, 'toInvert', type === 'focus' && el.name === 'cvc')
    }

    el.onfocus = toggleFocusState('focus')
    el.onblur = toggleFocusState('blur')

    if (el.name === 'number') Payment.formatCardNumber(el)
    if (el.name === 'expiry') Payment.formatCardExpiry(el)
    if (el.name === 'cvc') Payment.formatCardCVC(el)
  }
})
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
      isIE11: false,
      stateCard,
      classDisplay
    }
  },
  computed: {
    classCard: function () {
      let obj = {
        'jp-card-safari': this.isSafari,
        'jp-card-ie-10': this.isIE10,
        'jp-card-ie-11': this.isIE11,
        'jp-card-flipped': this.stateCard.toInvert
      }

      let identified = Payment.fns.cardType(this.value.number)

      obj['jp-card-identified'] = !!identified

      let knownFlag = false
      options.cardTypes.forEach(type => {
        if (identified === type) obj['jp-card-' + type] = knownFlag = true
      })

      if (!knownFlag) obj['jp-card-unknown'] = true

      return obj
    },
    display: function () {
      this.value.number = Payment.fns.formatCardNumber(this.value.number)

      let value = Object.assign({}, this.value)

      Object.keys(value).forEach(key => !value[key] && delete value[key])

      value = Object.assign({}, options.placeholders, value)

      return {
        number: value.number,
        name: value.name,
        expiry: value.expiry.replace(/(\s+)/g, ''),
        cvc: value.cvc
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
  },
  mounted () {
  }
}
function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
</script>

<style lang="scss">
  @import "../scss/card"

</style>