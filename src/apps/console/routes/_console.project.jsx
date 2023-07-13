import { useState } from "react"
import { Link, useNavigate } from "@remix-run/react"
import { PlusFill } from "@jengaicons/react"
import { SubHeader } from "~/components/organisms/sub-header.jsx"
import { Button } from "~/components/atoms/button.jsx"
import { EmptyState } from "~/components/molecule/empty-state.jsx"
import ResourceList from "../components/resource-list"


export default ({ }) => {

    const [projects, setProjects] = useState([1])

    const navigate = useNavigate()

    const [projectListMode, setProjectListMode] = useState("list")

    return <>
        <SubHeader title={"Projects"} actions={
            projects.length != 0 && <>
                <Button variant="primary" content="Add new" prefix={PlusFill} href={"/new-project"} LinkComponent={Link} />
            </>
        } />
        {projects.length > 0 && <div className="pt-5 flex flex-col gap-10">

            <div>
                <ResourceList items={[1, 2, 3, 4, 5]} mode={projectListMode} />
            </div>
        </div>}
        {projects.length == 0 && <div className="pt-5">
            <EmptyState
                heading={"This is where you’ll manage your projects"}
                children={
                    <p>
                        You can create a new project and manage the listed project.
                    </p>
                }
                action={{
                    title: "Create Project",
                    LinkComponent: Link,
                    href: "/new-project"
                }}
            />
        </div>}
    </>
}