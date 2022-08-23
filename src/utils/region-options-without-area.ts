import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import _ from "lodash";

const getOptions = () => {
  const _provinces = _.cloneDeep(provinces);
  const _cities = _.cloneDeep(cities);

  _cities.forEach((city) => {
    const matchProvince = _provinces.filter(
      (province) => province.code === city.provinceCode
    )[0];
    if (matchProvince) {
      (matchProvince as any).children = (matchProvince as any).children || [];
      (matchProvince as any).children.push({
        label: city.name,
        value: city.code,
        children: (city as any).children,
      });
    }
  });

  const options = _provinces.map((province) => ({
    label: province.name,
    value: province.code,
    children: (province as any).children,
  }));

  return options;
};

export default getOptions();
