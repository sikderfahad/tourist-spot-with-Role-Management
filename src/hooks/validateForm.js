export const validateForm = (data) => {
  const errors = {};
  if (!data.spot_name) errors.spot_name = "Spot name is required.";
  if (!data.country_name) errors.country_name = "Country name is required.";
  if (!data.location) errors.location = "Location is required.";
  if (!data.details) errors.details = "Description is required.";
  if (!data.average_cost) errors.average_cost = "Average cost is required.";
  if (!data.seasonality) errors.seasonality = "Seasonality is required.";
  if (!data.travel_time) errors.travel_time = "Travel time is required.";
  if (!data.photo?.size > 0) errors.photo = "Spot photo is required.";
  if (!data.tota_visitors_per_year)
    errors.tota_visitors_per_year = "Visitors count is required.";
  return errors;
};
