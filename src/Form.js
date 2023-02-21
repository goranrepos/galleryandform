import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";

const Form = () => {
  const schema = yup.object().shape({
    name: yup.string().required().max(5, "Must be exactly 5 letters"),
    email: yup.string().email().required(),
    dateOfBirth: yup
      .string()
      .required()
      .test("format", "Invalid date", (date) => {
        const regex = new RegExp(
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
          "i"
        );
        return regex.test(date.split("-").reverse().join("-"));
      })
      .test(
        "format",
        "Invalid date of birth",
        (date) => new Date(date) < Date.now()
      ),
    favColor: yup.string().required(),
    salary: yup.number().required(),
  });

  const defaultValues = {
    name: "",
    email: "",
    color: "#ff0000",
    value: "50000",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="container">
      <h1 className="bold text-2xl underline">Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            defaultValue={defaultValues.name}
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </section>

        <section>
          <label htmlFor="email">Email</label>
          <input
            defaultValue={defaultValues.email}
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </section>

        <section>
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            defaultValue={defaultValues.dateOfBirth}
            type="date"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
        </section>

        <section>
          <label htmlFor="favColor">Favourite colour</label>
          <input
            defaultValue={defaultValues.favColor}
            type="color"
            {...register("favColor")}
          />
          {errors.favColor && <p>{errors.favColor.message}</p>}
        </section>

        <section>
          <label htmlFor="salary">Salary (using a range input)</label>
          <input
            defaultValue={defaultValues.salary}
            type="range"
            min="10000"
            max="100000"
            {...register("salary")}
          />
          {errors.salary && <p>{errors.salary.message}</p>}
        </section>

        <p>Submit the values</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
