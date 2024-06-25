import Link from 'next/link'

export function Pagination(props) {
  const total_pages = props.pagination.total_pages
  const current_page = props.pagination.current_page
  const max_size = 5
  const pagination_size = (total_pages > max_size) ? max_size : total_pages
  const center_border = Math.floor(max_size / 2)
  const centerd_start_point = current_page - center_border
  const right_border = total_pages - center_border + 1
  const righted_start_point = total_pages - pagination_size + 1

  const links = () => {
    if (current_page <= center_border) {
      return (
        new Array(pagination_size).fill(1).map((n, i) => n + i)
      )
    } else if (center_border < current_page && current_page < right_border) {
      return (
        new Array(pagination_size).fill(centerd_start_point).map((n, i) => n + i)
      )
    } else if (right_border <= current_page) {
      return (
        new Array(pagination_size).fill(righted_start_point).map((n, i) => n + i)
      )
    }
  }

  const PageLink = (i) => {
    if (i == current_page) {
      return (
        <div className="border-2 border-green-600 w-12 h-12 bg-green-500 flex items-center justify-center">
          <span className="text-white"> {i} </span>
        </div>
      )
    } else {
      return (
        <Link href={"battle?page=" + i} onClick={()=> props.setPaged(i)}>
            <div className="border-2 border-green-600 w-12 h-12 flex items-center justify-center">
                {i}
            </div>
        </Link>
      )
    }
  }

  return (
    <ul className="flex justify-center pb-10">
      {links().map(
        (link) =>
          <li key={link} className="mx-1">
            {PageLink(link)}
          </li>
        )
      }
    </ul>
  )
}
