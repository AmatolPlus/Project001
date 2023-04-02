export default function formatArray(data: []) {
  if (data) {
    let itemList = data.map((obj: {name: string; items: object}) => {
      let name = obj?.name;
      let items = obj.items;
      return {
        title: name,
        data: items,
      };
    });
    return itemList.flat();
  } else {
    return null;
  }
}
