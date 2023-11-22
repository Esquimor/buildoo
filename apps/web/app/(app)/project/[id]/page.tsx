interface ProjectProps {
  params: {
    id: string;
  }
}

export default function Project({
  params
}: ProjectProps) {
  
  return (
    <div>
      {params.id}
    </div>
  )
}