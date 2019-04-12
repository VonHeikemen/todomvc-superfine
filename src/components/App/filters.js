export function filterItems(items, filter) {
  switch (filter) {
    case 'all':
      return items;
    case 'active':
      return items.filter(item => item.completed === false);
    case 'completed':
      return items.filter(item => item.completed === true);

    default:
      return items;
  }
}
