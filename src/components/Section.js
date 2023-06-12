export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
  //  Note for Reviewer: The .reverse() is used because the way the api pulls the card order does not remain the same order when adding a new card, then refreshing after adding a card.
  addItem(element) {
    this._container.prepend(element);
  }
}
