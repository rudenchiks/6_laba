/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        // Строковые фильтры
        const filterText = {
            "Название": form["structure"].value.toLowerCase(),
            "Тип": form["type"].value.toLowerCase(),
            "Страна": form["country"].value.toLowerCase(),
            "Город": form["city"].value.toLowerCase(),
        };

        // Числовые фильтры: диапазоны
        const filterRange = {
            "Год": [
                form["year_min"].value ? parseInt(form["year_min"].value) : -Infinity,
                form["year_max"].value ? parseInt(form["year_max"].value) : Infinity,
            ],
            "Высота": [
                form["height_min"].value ? parseFloat(form["height_min"].value) : -Infinity,
                form["height_max"].value ? parseFloat(form["height_max"].value) : Infinity,
            ],
        };

        let filtered = props.fullData;

        // Применяем текстовые фильтры
        for (const key in filterText) {
            const value = filterText[key];
            if (value) {
                filtered = filtered.filter(item =>
                    item[key].toLowerCase().includes(value)
                );
            }
        }

        // Применяем числовые фильтры
        for (const key in filterRange) {
            const [min, max] = filterRange[key];
            filtered = filtered.filter(item => {
                const val = parseFloat(item[key]);
                return val >= min && val <= max;
            });
        }

        props.filtering(filtered);
    };

    const handleReset = (event) => {
        event.preventDefault();
        event.target.form.reset(); // очистка полей формы
        props.filtering(props.fullData); // восстановление исходной таблицы
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип:</label>
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от: </label>
                <input name="year_min" type="number"/>
            </p>
            <p>
              <label>Год до: </label>
              <input name="year_max" type="number"/>
            </p>
            <p>
                <label>Высота от: </label>
                <input name="height_min" type="number"/>
            </p>
            <p>
              <label>Высота до: </label>
              <input name="height_max" type="number"/>
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset" onClick={handleReset}>Очистить фильтр</button>
            </p>
        </form>
    );
};

export default Filter;
