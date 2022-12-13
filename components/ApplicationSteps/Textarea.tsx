import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  description?: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  required: boolean
  rows?: number
  cols?: number
}

const Textarea = ({
  name,
  description = '',
  value,
  onChange,
  required,
  rows = 4,
  cols = 10,
}: Props) => (
  <div className="p-2">
    <p className="md:text-lg">
      {name}
      {!required ? null : <span className="text-red-850 font-black">*</span>}
      {!description ? null : (
        <span className="text-xs md:text-sm">
          <br />
          {description}
        </span>
      )}
    </p>
    <textarea
      name={name}
      value={value}
      rows={rows}
      cols={cols}
      onChange={onChange}
      className="w-full rounded-xl p-2 mt-1"
    />
  </div>
)

export default Textarea
