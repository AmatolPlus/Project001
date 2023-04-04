export default function formatArray(data: []) {
  if (data) {
    let itemList = data.map(
      (obj: {name: string; items: object; id: string}) => {
        let name = obj?.name;
        let id = obj.id;
        let items = obj.items;
        return {
          title: name,
          data: items,
          id,
        };
      },
    );
    return itemList.flat();
  } else {
    return null;
  }
}
