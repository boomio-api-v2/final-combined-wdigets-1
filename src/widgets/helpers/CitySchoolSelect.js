import { Elements } from '../helpers/HtmlElementsHelper';

export function CitySchoolSelect({
  teams, // object from config: { "Vilnius": ["..."], "Kaunas": ["..."], ... }
}) {
  const citySelect = Elements.citySelect;
  const schoolSelect = Elements.schoolSelect;
  if (!citySelect || !schoolSelect) return;

  // Fill city options (sorted)
  const cities = Object.keys(teams || {}).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  // Reset and add default
  citySelect.innerHTML = '';
  const cityDefault = document.createElement('option');
  cityDefault.value = '';
  cityDefault.textContent = 'Miestas ar rajonas';
  citySelect.appendChild(cityDefault);

  cities.forEach((city) => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    citySelect.appendChild(opt);
  });

  // Reset school select to default placeholder
  const setSchoolPlaceholder = (text) => {
    schoolSelect.innerHTML = '';
    const def = document.createElement('option');
    def.value = '';
    def.textContent = text;
    schoolSelect.appendChild(def);
  };
  setSchoolPlaceholder('Pirmiau pasirink miestą ar rajoną');

  // When city changes → populate schools (sorted)
  citySelect.addEventListener('change', () => {
    const selectedCity = citySelect.value;
    schoolSelect.innerHTML = '';

    if (!selectedCity) {
      setSchoolPlaceholder('Pirmiau pasirink miestą ar rajoną');
      return;
    }

    const schools = (teams[selectedCity] || []).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    if (schools.length === 0) {
      const noOpt = document.createElement('option');
      noOpt.value = '';
      noOpt.textContent = 'Mokyklų sąraše nėra';
      schoolSelect.appendChild(noOpt);
      return;
    }

    const schoolDefault = document.createElement('option');
    schoolDefault.value = '';
    schoolDefault.textContent = 'Tavo atstovaujama mokykla';
    schoolSelect.appendChild(schoolDefault);

    schools.forEach((school) => {
      const opt = document.createElement('option');
      opt.value = school;
      opt.textContent = school;
      schoolSelect.appendChild(opt);
    });
  });
}
