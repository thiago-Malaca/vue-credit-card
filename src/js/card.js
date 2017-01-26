// import '../scss/card.scss'

// import QJ from 'qj'
// import payment from 'payment'
import Payment from '../../node_modules/payment/lib'

// import extend from 'node.extend'

let bindVal
console.log('Pode apagar', bindVal)
class Card {
  static initClass () {
    this.prototype.initializedDataAttr = 'data-jp-card-initialized'
    // this.prototype.cardTemplate = '' +
    // '<div class="jp-card-container">' +
    //     '<div class="jp-card">' +
    //         '<div class="jp-card-front">' +
    //             '<div class="jp-card-logo jp-card-elo">' +
    //               '<div class="e">e</div>' +
    //               '<div class="l">l</div>' +
    //               '<div class="o">o</div>' +
    //             '</div>' +
    //             '<div class="jp-card-logo jp-card-visa">visa</div>' +
    //             '<div class="jp-card-logo jp-card-mastercard">MasterCard</div>' +
    //             '<div class="jp-card-logo jp-card-maestro">Maestro</div>' +
    //             '<div class="jp-card-logo jp-card-amex"></div>' +
    //             '<div class="jp-card-logo jp-card-discover">discover</div>' +
    //             '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' +
    //             '<div class="jp-card-lower">' +
    //                 '<div class="jp-card-shiny"></div>' +
    //                 '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' +
    //                 '<div class="jp-card-number jp-card-display">{{number}}</div>' +
    //                 '<div class="jp-card-name jp-card-display">{{name}}</div>' +
    //                 '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' +
    //             '</div>' +
    //         '</div>' +
    //         '<div class="jp-card-back">' +
    //             '<div class="jp-card-bar"></div>' +
    //             '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' +
    //             '<div class="jp-card-shiny"></div>' +
    //         '</div>' +
    //     '</div>' +
    // '</div>'
    this.prototype.cardTypes = [
      'jp-card-amex',
      'jp-card-dankort',
      'jp-card-dinersclub',
      'jp-card-discover',
      'jp-card-jcb',
      'jp-card-laser',
      'jp-card-maestro',
      'jp-card-mastercard',
      'jp-card-unionpay',
      'jp-card-visa',
      'jp-card-visaelectron',
      'jp-card-elo'
    ]
    this.prototype.defaults = {
      // formatting: false,
      formSelectors: {
        numberInput: 'input[name="number"]',
        expiryInput: 'input[name="expiry"]',
        cvcInput: 'input[name="cvc"]',
        nameInput: 'input[name="name"]'
      },
      cardSelectors: {
        cardContainer: '.jp-card-container',
        card: '.jp-card',
        numberDisplay: '.jp-card-number',
        expiryDisplay: '.jp-card-expiry',
        cvcDisplay: '.jp-card-cvc',
        nameDisplay: '.jp-card-name'
      },
      messages: {
        validDate: 'valid\nthru',
        monthYear: 'month/year'
      },
      placeholders: {
        number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
        cvc: '&bull;&bull;&bull;',
        expiry: '&bull;&bull;/&bull;&bull;',
        name: 'Full Name'
      },
      masks: {
        cardNumber: false
      },
      classes: {
        valid: 'jp-card-valid',
        invalid: 'jp-card-invalid'
      },
      debug: false
    }

    this.prototype.handlers = {
      setCardType ($el, e) {
        let cardType = e.data

        console.log('Sem QJ', 'setCardType', cardType)
        // if (!QJ.hasClass(this.$card, cardType)) {
        //   QJ.removeClass(this.$card, 'jp-card-unknown')
        //   QJ.removeClass(this.$card, this.cardTypes.join(' '))
        //   QJ.addClass(this.$card, `jp-card-${cardType}`)
        //   QJ.toggleClass(this.$card, 'jp-card-identified', (cardType !== 'unknown'))
        //   return this.cardType = cardType
        // }
      },
      flipCard () {
        // return QJ.addClass(this.$card, 'jp-card-flipped')
        console.log('Sem QJ', 'flipCard')
      },
      unflipCard () {
        // return QJ.removeClass(this.$card, 'jp-card-flipped')
        console.log('Sem QJ', 'unflipCard')
      }
    }

    bindVal = function (el, out, opts) {
      if (opts == null) { opts = {} }
      opts.fill = opts.fill || false
      opts.filters = opts.filters || []
      if (!(opts.filters instanceof Array)) { opts.filters = [opts.filters] }

      opts.join = opts.join || ''
      if (!(typeof (opts.join) === 'function')) {
        let joiner = opts.join
        opts.join = () => joiner
      }

      let outDefaults = (Array.from(out).map((o) => o.textContent))

      console.log('Sem QJ', 'bindVal', outDefaults)

    //   QJ.on(el, 'focus', () => QJ.addClass(out, 'jp-card-focused'))

    //   QJ.on(el, 'blur', () => QJ.removeClass(out, 'jp-card-focused'))

    //   QJ.on(el, 'keyup change paste', function(e) {
    //     let outVal
    //     let val = (Array.from(el).map((elem) => QJ.val(elem)))

    //     let join = opts.join(val)

    //     val = val.join(join)
    //     if (val === join) { val = "" }

    //     for (let filter of Array.from(opts.filters)) {
    //       val = filter(val, el, out)
    //     }

    //     return Array.from(out).map((outEl, i) =>
    //       (opts.fill ?
    //         outVal = val + outDefaults[i].substring(val.length)
    //       :
    //         outVal = val || outDefaults[i],

    //       outEl.textContent = outVal))
    //   })
      return el
    }
  }
  template (tpl, data) {
    return tpl.replace(/\{\{(.*?)\}\}/g, (match, key, str) => data[key])
  }

  constructor (opts) {
    this.maskCardNumber = this.maskCardNumber.bind(this)
    // this.options = extend(true, this.defaults, opts)
    this.options = Object.assign({}, this.defaults, opts)

    // if (!this.options.form) {
    //   console.log('Please provide a form')
    //   return
    // }

    // console.log('Sem QJ', 'constructor')
    // this.$el = QJ(this.options.form)

    if (!this.options.container) {
      console.log('Please provide a container')
      return
    }

    // this.$container = QJ(this.options.container)

    // set a data attribute to ensure that card is only ever initialized
    // once on a given container
    console.log('Sem QJ', 'constructor.isDOMElement')
    // Tem que apagar
    // let toInitialize = this.$container
    // let toInitialize = QJ.isDOMElement(this.$container) ? this.$container : this.$container[0]
    // if (toInitialize.getAttribute(this.initializedDataAttr)) { return }
    // toInitialize.setAttribute(this.initializedDataAttr, true)

    this.render()
    this.attachHandlers()
    this.handleInitialPlaceholders()
  }

  render () {
    let selector
    console.log('Sem QJ', 'render')
    // QJ.append(this.$container, this.template(
    //   this.cardTemplate,
    //   extend({}, this.options.messages, this.options.placeholders)
    // ))

    for (var name in this.options.cardSelectors) {
      selector = this.options.cardSelectors[name]
    //   this[`$${name}`] = QJ.find(this.$container, selector)
    }

    for (name in this.options.formSelectors) {
      selector = this.options.formSelectors[name]
      selector = this.options[name] ? this.options[name] : selector

      console.log('Sem QJ', 'this.$el, selector')
      // Tem que apagar
      let obj = []
    //   let obj = QJ.find(this.$el, selector)

      if (!obj.length && this.options.debug) { console.error(`Card can't find a ${name} in your form.`) }
      // this[`$${name}`] = obj
    }

    // if (this.options.formatting) {
    //   Payment.formatCardNumber(this.$numberInput)
    //   Payment.formatCardCVC(this.$cvcInput)
    //   Payment.formatCardExpiry(this.$expiryInput)
    // }

    // if (this.options.width) {
    // //   let $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0]
    //   console.log('Sem QJ', '$cardContainer')
    //   // let baseWidth = parseInt($cardContainer.clientWidth || window.getComputedStyle($cardContainer).width)

    //   // $cardContainer.style.transform = `scale(${this.options.width / baseWidth})`
    // }

    // safari can't handle transparent radial gradient right now
    if (__guard__(navigator, x => x.userAgent)) {
      let ua = navigator.userAgent.toLowerCase()
      if ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1)) {
        // QJ.addClass(this.$card, 'jp-card-safari')
      }
    }
    if (/MSIE 10\./i.test(navigator.userAgent)) {
    //   QJ.addClass(this.$card, 'jp-card-ie-10')
    }
    // ie 11 does not support conditional compilation, use user agent instead
    if (/rv:11.0/i.test(navigator.userAgent)) {
    //   return QJ.addClass(this.$card, 'jp-card-ie-11')
    }
  }

  attachHandlers () {
    let numberInputFilters = [this.validToggler('cardNumber')]
    if (this.options.masks.cardNumber) { numberInputFilters.push(this.maskCardNumber) }

    bindVal(this.$numberInput, this.$numberDisplay, {
      fill: false,
      filters: numberInputFilters
    }
    )
    // QJ.on(this.$numberInput, 'payment.cardType', this.handle('setCardType'))

    let expiryFilters = [val => val.replace(/(\s+)/g, '')]
    expiryFilters.push(this.validToggler('cardExpiry'))

    bindVal(this.$expiryInput, this.$expiryDisplay, {
      join (text) {
        if ((text[0].length === 2) || text[1]) { return '/' } else { return '' }
      },
      filters: expiryFilters
    })

    bindVal(this.$cvcInput, this.$cvcDisplay, {filters: this.validToggler('cardCVC')})
    // QJ.on(this.$cvcInput, 'focus', this.handle('flipCard'))
    // QJ.on(this.$cvcInput, 'blur', this.handle('unflipCard'))

    return bindVal(this.$nameInput, this.$nameDisplay, {
      fill: false,
      filters: this.validToggler('cardHolderName'),
      join: ' '
    })
  }

  handleInitialPlaceholders () {
    return (() => {
      let result = []
      for (let name in this.options.formSelectors) {
        let selector = this.options.formSelectors[name]
        let item
        var el = this[`$${name}`]
        console.log('Sem QJ', 'el', el, selector)
        // if (QJ.val(el)) {
        //   // if the input has a value, we want to trigger a refresh
        //   QJ.trigger(el, 'paste')
        //   // set a timeout because `jquery.payment` does the reset of the val
        //   // in a timeout
        //   item = setTimeout(() => QJ.trigger(el, 'keyup'))
        // }
        result.push(item)
      }
      return result
    })()
  }

  handle (fn) {
    return function (e) {
      let args = Array.prototype.slice.call(arguments)
      args.unshift(e.target)
      return this.handlers[fn].apply(this, args)
    }.bind(this)
  }

  validToggler (validatorName) {
    let isValid
    if (validatorName === 'cardExpiry') {
      isValid = function (val) {
        let objVal = Payment.fns.cardExpiryVal(val)
        return Payment.fns.validateCardExpiry(objVal.month, objVal.year)
      }
    } else if (validatorName === 'cardCVC') {
      isValid = val => Payment.fns.validateCardCVC(val, this.cardType)
    } else if (validatorName === 'cardNumber') {
      isValid = val => Payment.fns.validateCardNumber(val)
    } else if (validatorName === 'cardHolderName') {
      isValid = val => val !== ''
    }

    return (val, $in, $out) => {
      let result = isValid(val)
      this.toggleValidClass($in, result)
      this.toggleValidClass($out, result)
      return val
    }
  }
  toggleValidClass (el, test) {
    // QJ.toggleClass(el, this.options.classes.valid, test)
    // return QJ.toggleClass(el, this.options.classes.invalid, !test)
  }

  maskCardNumber (val, el, out) {
    let mask = this.options.masks.cardNumber
    let numbers = val.split(' ')

    if (numbers.length >= 3) {
      numbers.forEach((item, idx) => {
        if (idx !== (numbers.length - 1)) {
          numbers[idx] = numbers[idx].replace(/\d/g, mask)
          return numbers[idx]
        }
      })
      return numbers.join(' ')
    } else {
      return val.replace(/\d/g, mask)
    }
  }
}
Card.initClass()

export default Card
// global.Card = Card

function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
