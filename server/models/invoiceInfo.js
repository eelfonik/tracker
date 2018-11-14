const InvoiceInfo = function(ft) {
    this._creator = ft._creator,
    this.number = ft.number,
    this.date = ft.date,
    this.sum = ft.sum,
    this.taxRate = ft.taxRate,
    this.currency = ft.currency,
    this.description = ft.description
};

module.exports = InvoiceInfo;