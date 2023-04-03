const Checks = {};

(() => {
  Checks.error = m => {
    const e = new Error(m);
    Logger.LogModError(m, e, "A mod caused an error");
  };

  Checks.checkAudienceWeightings = w => {
    if (!w || w.length < 3 || w.some(v => v < 0 || v > 1)) {
      Checks.error(`audience weighting is invalid: ${w}`);
      return false;
    }
    return true;
  };

  Checks.checkGenreWeightings = w => {
    if (!w || w.length < 6 || w.some(v => v < 0 || v > 1)) {
      Checks.error(`genre weighting is invalid: ${w}`);
      return false;
    }
    return true;
  };

  Checks.checkMissionOverrides = missionOverrides => {
    if (missionOverrides.length < 6 || missionOverrides.some(overrides => {
      return overrides.length < 6 || overrides.some(w => w > 1 || w < 0);
    })) {
      Checks.error(`invalid missionOverrides: ${missionOverrides}`);
      return false;
    }
    return true;
  };

  Checks.checkDate = date => {
    if (date && date.split) {
      const values = date.split("/");
      if (values && values.length === 3) {
        if (!values.some(v => v < 1)) {
          if (values[1] <= 12 && values[2] <= 4) {
            return true;
          }
        }
      }
    }
    Checks.error(`date invalid: ${date}`);
    return false;
  };

  Checks.checkPropertiesPresent = (obj, props) => {
    return props.every(p => {
      if (!p || p.length < 1) return true;
      if (!obj.hasOwnProperty(p)) {
        Checks.error(`property not set on object: ${p}`);
        return false;
      }
      return true;
    });
  };

  Checks.checkUniqueness = (obj, prop, values, ignoreError) => {
    const unique = !values.some(v => v[prop] === obj[prop]);
    if (!unique && !ignoreError) {
      Checks.error(`duplicate value for ${prop} found: ${obj[prop]}`);
    }
    return unique;
  };
})();
