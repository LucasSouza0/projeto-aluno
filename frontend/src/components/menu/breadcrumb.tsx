import React from 'react';
import { ChevronRightIcon } from "@chakra-ui/icons"
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb as CHBreadcrumb } from "@chakra-ui/react"

import { itensMenu } from '../../utils/menuItens';

export const Breadcrumb = () => {
  const location = window.location.pathname;

  return (
    <CHBreadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='#'> {itensMenu.find(menu => menu.url === location)?.title} </BreadcrumbLink>
      </BreadcrumbItem>
    </CHBreadcrumb>
  )
}
