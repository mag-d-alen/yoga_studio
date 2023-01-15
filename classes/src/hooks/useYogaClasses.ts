import { useEffect, useState } from "react";
import axios from "axios";

const url = "/yoga_classes";

export const useYogaClasses = () => {
  const [yogaClasses, setYogaClasses] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url);
        const classes = res.data;
        setYogaClasses(classes);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return yogaClasses;
};
