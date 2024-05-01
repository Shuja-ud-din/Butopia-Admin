const alphabeticSort = ( data, setData, sortOrder, setSortOrder ) => {
  const sortedData = [...data].sort((a, b) => {
    // Compare names based on the current sort order
    if (sortOrder == 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  setData(sortedData);

  // Toggle sort order for the next click
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};

export { alphabeticSort };
