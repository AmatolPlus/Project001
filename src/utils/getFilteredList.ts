function filteredList(data: any[]) {
  var uniqueContestList = data.filter(function (item: any, index) {
    return (
      data.findIndex(function (elem: any) {
        return elem?.user?.profile_id === item?.user?.profile_id;
      }) === index
    );
  });

  return uniqueContestList;
}

export {filteredList};
