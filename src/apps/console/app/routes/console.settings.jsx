import { Outlet } from "@remix-run/react"
import { Links, LiveReload, useLocation, useMatch } from "@remix-run/react";
import { ActionList } from "../../../../components/atoms/action-list"
import { SubHeader } from "../../../../components/organisms/sub-header"

export default function ConsoleSettings() {

    const location = useLocation()
    console.log('location', location.pathname);

    let match = useMatch({
        path: "/console/:path/*"
    }, location.pathname)

    return <div className="flex flex-col gap-y-[40px]">
        <SubHeader title={"Personal Account Settings"} />
        <div className="flex flex-row gap-x-[100px]">
            <ActionList
                layoutId="settings"
                value={match.params["*"]}
                items={[
                    {
                        label: "General",
                        value: "general",
                        key: "general",
                        href: "general"
                    },
                    {
                        label: "Billing",
                        value: "billing",
                        key: "billing",
                        href: "billing"
                    },
                    {
                        label: "Invoices",
                        value: "invoices",
                        key: "invoices",
                    },
                    {
                        label: "User management",
                        value: "usermanagement",
                        key: "usermanagement",
                    },
                    {
                        label: "Security & Privacy",
                        value: "securityandprivacy",
                        key: "securityandprivacy",
                    }
                ]} />
            <Outlet />
        </div>
    </div>
}