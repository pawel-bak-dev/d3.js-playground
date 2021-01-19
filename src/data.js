import * as d3 from 'd3';

const data = {
  1: {
    id: 1,
    name: 'Group 1',
    price_sum: 12345.99,
    quantity_sum: 234,
    categories: {
      4: {
        id: 4,
        name: 'Category 4',
        price_sum: 12345.99,
        quantity_sum: 234,
        subcategories: {
          5: {
            id: 5,
            name: 'Subcategory 5',
            price_sum: 12345.99,
            quantity_sum: 234
          }
        }
      }
    }
  }
};

const dataArr = [
  {
    id: 1,
    name: 'Group 1',
    price_sum: 12345.99,
    quantity_sum: 234,
    children: [
      {
        id: 3,
        name: 'Category 4',
        price_sum: 12345.99,
        quantity_sum: 234,
        children: [
          {
            id: 5,
            name: 'Subcategory 5',
            price_sum: 12345.99,
            quantity_sum: 234
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Group 1',
    price_sum: 12345.99,
    quantity_sum: 234,
    children: [
      {
        id: 4,
        name: 'Category 4',
        price_sum: 12345.99,
        quantity_sum: 234,
        children: [
          {
            id: 6,
            name: 'Subcategory 5',
            price_sum: 12345.99,
            quantity_sum: 234
          },
          {
            id: 7,
            name: 'Subcategory 5',
            price_sum: 12345.99,
            quantity_sum: 234
          }
        ]
      }
    ]
  }
];

const dataArrNoChild = [
  {
    id: 1,
    name: 'Group 1',
    price_sum: 12345.99,
    quantity_sum: 234
  },
  {
    id: 2,
    name: 'Group 1',
    price_sum: 12345.99,
    quantity_sum: 234
  }
];

function formatData(data, valuePropertyName, parentColor = null) {
  return data.map((d, index) => {
    const color = parentColor
      ? d3
          .rgb(parentColor)
          .brighter((index + 1) * 0.5)
          .hex()
      : d3.schemeCategory10[index];

    return {
      ...d,
      color,
      value: d[valuePropertyName],
      children:
        d.children?.length > 0
          ? formatData(d.children, valuePropertyName, color)
          : []
    };
  });
}

export default formatData(dataArrNoChild, 'quantity_sum');
