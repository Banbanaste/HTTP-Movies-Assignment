import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log({ ...movie, ...data });
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, {
        ...movie,
        ...data
      })
      .then(res => props.history.push(`/movies/${props.match.params.id}`))
      .catch(err => console.log(err));
  };

  console.log(props);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" defaultValue={movie.title} ref={register} />
        <input name="director" defaultValue={movie.director} ref={register} />
        <input name="metascore" defaultValue={movie.metascore} ref={register} />
        <input type="submit" />
      </form>
    </div>
  );
}
