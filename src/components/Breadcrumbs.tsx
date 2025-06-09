import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from 'react';

const Breadcrumbs = () => {

    const pathName = usePathname();
    const segments = pathName.split('/');

  return (
    <Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        
        {
            segments.map((segment, index) => {
                if (!segment) {
                    return null
                }

                let href = `/${segments.slice(0, index + 1).join('/')}`
                const isLast = index === segments.length - 1;

                if (index == 1) {
                    href = '/doc'
                }

                return <Fragment key={segment}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {
                                    isLast ? (
                                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                                    )
                                }
                            </BreadcrumbItem>
                        </Fragment>

            })
        }

    </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs