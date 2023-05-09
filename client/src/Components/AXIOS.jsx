import { Component } from "react";
import axios from "axios";
class CRUDAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      formValue: {
        name: "",
        age: "",
        joinDate: "",
      },
    };
  }
  componentDidMount() {
    this.getMethod();
  }

  getMethod = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/get",
    }).then((response) =>
      this.setState({
        Data: response.data,
        formValue: {
          name: "",
          age: "",
          joindate: "",
        },
        id: "",
      })
    );
  };

  handleEdit = (product, id) => {
    this.setState({ formValue: product, id: id });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ formValue:{ ...this.state.formValue, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      axios({
        method: "PUT",
        url: `http://localhost:5000/put/${this.state.id}`,
        data: this.state.formValue,
      }).then((response) =>
        response.data ? this.getMethod() : console.log(response.data, "EDIT")
      );
    } else if (this.state.formValue.name) {
      axios({
        method: "POST",
        url: "http://localhost:5000/create",
        data: this.state.formValue,
      }).then((response) =>
        response.data ? this.getMethod() : console.log(response.data, "POST")
      );
    }
  };

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/delete/${id}`,
    }).then((response) =>
      response.data ? this
      .getMethod() : console.log(response.data, "DELETE")
    );
  };
  render() {
    return (
      <>
      
        <h1 className="text-2xl">Employee Details</h1>
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px] shadow-xl p-10">
            <form>
              <div class="mb-5">
                <label
                  for="name"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.formValue.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Age
                </label>
                <input
                  required
                  type="text"
                  name="age"
                  value={this.state.formValue.age}
                  onChange={this.handleChange}
                  placeholder="age"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="mb-5">
                <label
                  for="subject"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Join Date
                </label>
                <input
                  required
                  type="date"
                  name="joindate"
                  value={this.state.formValue.joindate}
                  onChange={this.handleChange}
                  placeholder="Date"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div>
                <button
                  onClick={this.handleSubmit}
                  class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  {this.state.id ? "SAVE" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <h1 className="text-2xl">Get Method</h1>
        <div class="md:px-32 py-5 w-full">
          <div class="shadow overflow-hidden rounded border-b border-gray-200">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-800 text-white">
                <tr>
                  <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th class="w-1 text-left py-3 px-2 uppercase font-semibold text-sm">
                    Age
                  </th>
                  <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Join Date
                  </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                {this.state.Data.map((product,i) => {
                  return (
                    <tr key={i}>
                      <td class="w-1/3 text-left py-3 px-4">{product.name}</td>
                      <td class="w-1/3 text-left py-3 px-4">{product.age}</td>
                      <td class="text-left py-3 px-4">
                        <a class="hover:text-blue-500" href="tel:622322662">
                          {product.joindate}
                        </a>
                      </td>

                      <td>
                        {" "}
                        <button
                          className="p-3 bg-purple-500 rounded-lg text-white"
                          onClick={() => this.handleEdit(product, product._id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button
                          className="p-3 bg-red-500 rounded-lg text-white"
                          onClick={() => this.handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default CRUDAPI;
