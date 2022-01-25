Vue.component('upgrade', {  
  props: ['cash', 'initial_cost', 'increase', 'title', 'tooltip'],
  data: function() {
  	return {
    	//cost: this.initial_cost,
      cost_increase: this.increase,
      base_cost: this.initial_cost,
      amount: 0,
      name: this.title,
      help: this.tooltip
    }
  },
  computed: {
    cost: function() {
      return this.base_cost * Math.pow(this.cost_increase, this.amount) | 0;
    }
  },
	template: '#upgrade-template',
  methods: {
  	buy: function(event) {
    	if (this.cash >= this.cost) {
        this.$emit('purchase', this.cost);
        this.$emit('upgrade');
        //this.cost_increase += 1;
        this.amount += 1;
      }
    }
  }
});

vm = new Vue({
  el: '#app',
  data: {
    cash: 0,
    clickrate: 1,
    cps_multiplier: 1,
    cps_units: 0,
    show: false
  },
  computed: {
    cash_per_second: function() {
      return this.cps_units * this.cps_multiplier;
    }
  },
  filters: {
    number_format: function(number) {
      if (number >= 1e6)
        return numberformat.formatShort(Number(number));
      else
        return number.toLocaleString('en-US');
    }
  },
  methods: {
    charge: function(cost) {
      this.cash -= cost;
    },
    double_clickrate: function() {
      this.clickrate *= 2;
    },
    increase_cash_sec: function() {
      this.cps_units += 1;
    },
    increase_cash_sec_by_ten: function() {
      this.cps_units += 10;
    },
    do_click: function() {
      this.cash += this.clickrate;
    }
  },
  created: function() {
    var that = this;
    window.setInterval(function() {
      that.cash += that.cash_per_second;
    }, 1000);
  }
});