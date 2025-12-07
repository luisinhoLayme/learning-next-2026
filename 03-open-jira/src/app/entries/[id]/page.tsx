import FormTexarea from "../../../components/ui/form-textarea";

const EntryPage = () => {
  return (
    <main className="">
      <div className="card bg-slate-50/5  text-neutral-content w-[90vw] sm:w-[600px] mt-2 m-auto">
        <div className="card-body items-start text-center">
          <h1 className="card-title">Entry</h1>
          <p>Created .. minutes</p>

          <div className="card-actions w-full">
            <FormTexarea />
          </div>
        </div>
      </div>
    </main>
  )
}

export default EntryPage
