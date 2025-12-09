import type { Dispatch, FC, SetStateAction } from "react"

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
}

const ConfirmDelete: FC<Props> = ({ setOpenModal, onConfirm }) => {
  return (
    <section
      onClick={() => setOpenModal(prev => !prev)}
      className="bg-black/50 fixed left-0 top-0 w-full h-full grid place-content-center z-20"
    >
      <div
        onClick={(e) => { e.stopPropagation() }}
        className="card-body bg-purple-100 dark:bg-[#242425] rounded-xl min-w-xl max-w-xl "
      >
        <h2 className="card-title justify-center"> Confirm deletion</h2>
        <p>Are you sure you want to delete the entry? It will be permanently deleted.</p>

        <div className="flex gap-5 justify-center">
          <button onClick={() => setOpenModal(prev => !prev)} className="btn btn-sm btn-error">Cancel</button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-success"
          >Confirm</button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmDelete
