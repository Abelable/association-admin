import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";

cities.forEach((city) => {
  const matchProvince = provinces.filter(
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

const options = provinces.map((province) => ({
  label: province.name,
  value: province.code,
  children: (province as any).children,
}));

export default options;
