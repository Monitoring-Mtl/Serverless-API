import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import {apiKey, apiUrl} from '../config/config.js';


// Create an Axios instance with the custom headers
const axiosInstance = axios.create({
  headers: {
    'apiKey': apiKey,
  },
});

export const getVehiclePosition = async (req, res, next) => {
  let response;

  try {
    const stmRes = await axiosInstance
        .get(apiUrl, {responseType: 'arraybuffer'});

    const decodedData = GtfsRealtimeBindings.transit_realtime.FeedMessage
        .decode(new Uint8Array(stmRes.data));

    response = res.status(200).json({
      body: decodedData,
    });
  } catch (err) {
    // Error handling
    response = res.status(409).json({
      body: JSON.stringify({
        message: 'Error fetching STM data:' + err,
      }),
    });
  }

  return response;
};
