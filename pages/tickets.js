const Tickets = () => {
  return (
    <div className="mt-16">
      <h1 className="text-2xl md:text-4xl ">My Tickets</h1>
      <form className="" onSubmit={this.onListForSale}>

        <label className="left">Festival</label>
        <select className="browser-default" name='fest' value={this.state.fest || undefined} onChange={this.onFestivalChangeHandler}>
          <option value="" disabled >Select Festival</option>
          {this.state.fests}
        </select><br /><br />

        <label className="left">Ticket Id</label>
        <select className="browser-default" name='ticket' value={this.state.ticket || undefined} onChange={this.selectHandler}>
          <option value="" disabled>Select Ticket</option>
          {this.state.tickets}
        </select><br /><br />

        <label className="left">Sale Price</label>
        <input id="price" placeholder="Sale Price" type="text" className="input-control" name="price" onChange={this.inputChangedHandler} />
        <br /><br />

        <button type="submit" className="custom-btn login-btn">List for Sale</button>
      </form>
    </div>
  )
}

export default Tickets
