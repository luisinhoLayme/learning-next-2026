import FormTexarea from "../../../components/ui/form-textarea";
import ButtonDelete from '../../../components/ui/button-delete'
import { permanentRedirect } from "next/navigation";
import { isValidUUID } from "@/utils/is-validUUID";
import { Entry } from "@/interfaces/entry";
import { timeAgo } from "@/utils/dateFunctions";

interface Props {
  params: Promise<{ id: string }>
}

async function getEntry(id: string): Promise<Entry> {
  const resp = await fetch(`http://localhost:3000/api/entries/${id}`, {cache: 'no-store'})
  const entry: Entry = await resp.json()

  return entry
}

export default async function EntryPage({params}: Props) {
  const { id } = await params

  if (!isValidUUID(id)) {
    permanentRedirect('/')
  }

  const entry = await getEntry(id)

  return (
    <main className="">
      <div className="card bg-purple-100 dark:bg-purple-50/5 text-neutral-content w-[90vw] sm:w-[600px] mt-2 m-auto">
        <div className="card-body items-start text-center">
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="card-title">Entry</h1>
              <p className="badge badge-primary badge-sm badge-soft pl-0">
                { timeAgo(entry.createdAt) }
              </p>
            </div>
            <ButtonDelete id={entry.id} />
          </div>

          <div className="card-actions w-full">
            <FormTexarea entry={entry} />
          </div>
        </div>
      </div>
    </main>
  )
}
