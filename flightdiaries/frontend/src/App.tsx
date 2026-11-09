import { useState, useEffect } from "react";
import { Visibility, Weather, type NonSensitiveDiary, type ValidationError } from "./types";
import diaryService from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, setNewComment] = useState("");

  const [diaries, setDiaries] = useState<NonSensitiveDiary[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const returnedDiary = await diaryService.create({
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      });

      setDiaries((current) => current.concat(returnedDiary));
      setNewDate("");
      setNewWeather(Weather.Sunny);
      setNewVisibility(Visibility.Great);
      setNewComment("");
      setError("");
    } catch (e) {
      if (axios.isAxiosError<ValidationError>(e)) {
        const issue = e.response?.data.error?.[0];
        const field = String(issue?.path[0]);
        const values: Record<string, string> = {
          date: newDate,
          weather: newWeather,
          visibility: newVisibility,
          comment: newComment,
        };

        setError(issue ? `Error: Incorrect ${field}: ${values[field]}` : e.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={diaryCreation}>
        <label>
          Date:
          <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </label>

        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                checked={newWeather === weather}
                onChange={() => setNewWeather(weather)}
              />
              {weather}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                checked={newVisibility === visibility}
                onChange={() => setNewVisibility(visibility)}
              />
              {visibility}
            </label>
          ))}
        </fieldset>
        <label>
          Comment:
          <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </label>

        <button type="submit">add</button>
      </form>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            Date: {diary.date}, Weather: {diary.weather}, Visibility: {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
