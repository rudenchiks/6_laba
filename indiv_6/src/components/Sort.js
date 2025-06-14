const Sort = ({ sortConfig, setSortConfig }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const newSortConfig = [
      {
        level: parseInt(form["first_level"].value),
        desc: form["first_desc"].checked
      },
      {
        level: parseInt(form["second_level"].value),
        desc: form["second_desc"].checked
      },
      {
        level: parseInt(form["third_level"].value),
        desc: form["third_desc"].checked
      }
    ];

    setSortConfig(newSortConfig);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sort-group">
        <label>Первый уровень:</label>
        <select name="first_level" defaultValue="-1">
          <option value="-1">Нет</option>
          <option value="0">Название</option>
          <option value="1">Год</option>
          <option value="2">Рейтинг</option>
          <option value="3">Лайки</option>
          <option value="4">Стоимость</option>
        </select>
        <input type="checkbox" name="first_desc" /> по убыванию?
      </div>
      <div className="sort-group">
        <label>Второй уровень:</label>
        <select name="second_level" defaultValue="-1">
          <option value="-1">Нет</option>
          <option value="0">Название</option>
          <option value="1">Год</option>
          <option value="2">Рейтинг</option>
          <option value="3">Лайки</option>
          <option value="4">Стоимость</option>
        </select>
        <input type="checkbox" name="second_desc" /> по убыванию?
      </div>
      <div className="sort-group">
        <label>Третий уровень:</label>
        <select name="third_level" defaultValue="-1">
          <option value="-1">Нет</option>
          <option value="0">Название</option>
          <option value="1">Год</option>
          <option value="2">Рейтинг</option>
          <option value="3">Лайки</option>
          <option value="4">Стоимость</option>
        </select>
        <input type="checkbox" name="third_desc" /> по убыванию?
      </div>
      <div className="sort-group">
        <button type="submit">Сортировать</button>
      </div>
    </form>
  );
};

export default Sort;