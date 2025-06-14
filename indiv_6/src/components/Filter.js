const Filter = ({ fullData, data, filtering }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const filterText = {
      "Название": form["name"].value.toLowerCase()
    };

    const filterRange = {
      "Лайки": [
        form["likes_from"].value ? parseFloat(form["likes_from"].value) : -Infinity,
        form["likes_to"].value ? parseFloat(form["likes_to"].value) : Infinity
      ],
      "Год": [
        form["year_from"].value ? parseFloat(form["year_from"].value) : -Infinity,
        form["year_to"].value ? parseFloat(form["year_to"].value) : Infinity
      ],
      "Рейтинг": [
        form["rating_from"].value ? parseFloat(form["rating_from"].value) : -Infinity,
        form["rating_to"].value ? parseFloat(form["rating_to"].value) : Infinity
      ],
      "Стоимость": [
        form["cost_from"].value ? parseFloat(form["cost_from"].value) : -Infinity,
        form["cost_to"].value ? parseFloat(form["cost_to"].value) : Infinity
      ]
    };

    let filtered = fullData;

    for (const key in filterText) {
      const value = filterText[key];
      if (value) {
        filtered = filtered.filter(item =>
          item[key].toLowerCase().includes(value)
        );
      }
    }

    for (const key in filterRange) {
      const [min, max] = filterRange[key];
      filtered = filtered.filter(item => {
        const val = parseFloat(item[key]);
        return val >= min && val <= max;
      });
    }

    filtering(filtered);
  };

  const handleReset = (event) => {
    event.preventDefault();
    event.target.form.reset();
    filtering(fullData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="filter-group">
        <label>Название:</label>
        <input name="name" type="text" />
      </div>
      <div className="filter-group">
        <label>Лайки от:</label>
        <input name="likes_from" type="number" />
        <label>до:</label>
        <input name="likes_to" type="number" />
      </div>
      <div className="filter-group">
        <label>Год от:</label>
        <input name="year_from" type="number" />
        <label>до:</label>
        <input name="year_to" type="number" />
      </div>
      <div className="filter-group">
        <label>Рейтинг от:</label>
        <input name="rating_from" type="number" step="0.1" />
        <label>до:</label>
        <input name="rating_to" type="number" step="0.1" />
      </div>
      <div className="filter-group">
        <label>Стоимость от:</label>
        <input name="cost_from" type="number" />
        <label>до:</label>
        <input name="cost_to" type="number" />
      </div>
      <div className="filter-group">
        <button type="submit">Применить фильтр</button>
        <button type="reset" onClick={handleReset}>Сбросить фильтр</button>
      </div>
    </form>
  );
};

export default Filter;