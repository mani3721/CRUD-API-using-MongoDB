import { Component } from "react";
import axios from 'axios'
import superagent from 'superagent'
class SuperAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      formValue: {
        title: "",
        author: "",
        formDate: "",
        toDate: "",
      },
    };
  }
  componentDidMount() { 
    this.getMetodApi()
  }

  getMetodApi=()=>{
    superagent.get("http://localhost:5000/books")
    .end((error, response)=>{
     this.setState({Data:response.body})
    })
  }

  handleEdit=(product,id)=>{
    this.setState({formValue:product,id:id})

  }
  
  handleSave=()=>{
 superagent.put(`http://localhost:5000/books/${this.state.id}`)
 .send(this.state.formValue)
 .set("X-API-Key", "foobar")
 .set("accept", "json")
 .end((err, res) => {
 if (res.body) {
    this.getMetodApi()
 }
});
  }

  handleChange=(e)=>{
    const {value, name}=e.target
    this.setState({formValue:{...this.state.formValue,[name]:value}})
  }


handleClick=(e)=>{
    e.preventDefault()
  
superagent.post("http://localhost:5000/books")
.send(this.state.formValue)
.set("X-API-Key", "foobar")
.set("accept", "json")
.end((err, res) => { 
   if (res.body) {
    this.getMetodApi()
   }
} );
}

handleDelete=(id)=>{
  superagent.delete(`http://localhost:5000/books/${id}`)
  .end((err, response)=>{
    if (response.body) {
        this.getMetodApi() 
    }
  })
}
render() {
    return (
      <>
<h1 className="text-2xl">Super Agent Methods</h1>
<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px]">
    <form >
      <div class="mb-5">
        <label
          for="name"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Title
        </label>
        <input
           type="text"
           name="title"
           value={this.state.formValue.title}
           onChange={this.handleChange}
          placeholder="Title"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Author
        </label>
        <input
           type="text"
           name="author"
           value={this.state.formValue.author}
           onChange={this.handleChange}
          placeholder="Author"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="subject"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          From Date
        </label>
        <input
           type="date"
           name="formDate"
           value={this.state.formValue.formDate}
           onChange={this.handleChange}
          placeholder="Date"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          ToDate
        </label>
        <input
          type="date"
          name="toDate"
          value={this.state.formValue.toDate}
          onChange={this.handleChange}
          placeholder="To Date"
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div>
        <button onClick={this.handleClick}
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

<h1 className="text-2xl">Get Method</h1>
 {
  this.state.Data.map((product)=>{
    return  <div tabindex="0" class="focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
   
    <div class="bg-white dark:bg-gray-800">
     
        <div class="p-4">
            <div class="flex items-center">
                <h2 tabindex="0" class="focus:outline-none text-lg dark:text-white font-semibold">Name:{product.title}</h2>
               
            </div>
            <div class="flex items-center justify-between py-4">
                <h3 tabindex="0" class="focus:outline-none  text-xl font-semibold">Author:{product.author}</h3>
            </div>
        </div>
        <button className="p-3 bg-green-400 rounded-lg text-white" onClick={()=>this.handleEdit(product, product.id)}>Edit</button>
        <button className="p-3 bg-teal-500 rounded-lg text-white" onClick={this.handleSave}>SAVE</button>
        <button className="p-3 bg-cyan-400 rounded-lg text-white" onClick={()=>this.handleDelete(product.id)}>Delete</button>
    </div>
</div>
  })
 }

                   
      </>
    );
  }
}

export default SuperAgent;
