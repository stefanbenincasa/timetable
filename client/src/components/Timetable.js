function Timetable() {
  return (
    <div id="Timetable" className="w-100 h-100 p-3 row rounded border border-primary">
        <header className="h-25 col-12 d-flex justify-content-center align-items-center bg-primary text-white"><h2>Timetable</h2></header>
        <div className="h-75 p-0 col-12" style={{ overflowY: "scroll"}}>
            <div className="h-25 p-2 bg-light"> Item </div>
            <div className="h-100 p-2 bg-light"> Item </div>
            <div className="p-2 bg-light"> Item </div>
            <div className="p-2 bg-light"> Item </div>
            <div className="p-2 bg-light"> Item </div>
        </div>
    </div>
  )
}

export default Timetable