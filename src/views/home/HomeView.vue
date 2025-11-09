<script setup lang="ts">
import { Col, HomeLayout, Row } from '@/components/layouts'
import { useCurrentUser, useCollection } from 'vuefire'
import { getUserSheetsCollection } from '@/scripts/db'
import { reactive, watch, watchEffect, ref } from 'vue'
import type { Filter } from '@/types/filter'
import type { Sheet } from '@/types/sheet'
import { Select } from '@/components/lib/inputs'
import { Title, Subtitle } from '@/components/ui'
import { AddSheetForm, SheetFilters, SheetsDisplay } from './components'

const user = useCurrentUser()
const sheets = ref<Sheet[]>([])

watchEffect(() => {
  if (user.value?.uid) {
    sheets.value = useCollection(getUserSheetsCollection(user.value.uid)) as any
  } else {
    sheets.value = []
  }
})

const filters = ref<Filter[]>([])
const pageLen = ref<number>(10)
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col align-center overflow-x-hidden">
    <div class="mt-16 mx-8">
      <Title class="mb-12">
        welcome back{{ user ? ', ' + user.displayName?.split(' ')[0] + '!' : '!' }}
      </Title>
      <div></div>
      <HomeLayout>
        <Col gap="4" class="min-w-48">
          <Col>
            <Row class="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"
                ></path>
              </svg>
              <Subtitle>add new sheet</Subtitle>
            </Row>
            <AddSheetForm />
          </Col>
          <Col>
            <Row class="mb-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="filterIconTitle"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                color="#000000"
              >
                <title id="filterIconTitle">Filter</title>
                <path d="M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z" />
              </svg>
              <Subtitle>filters</Subtitle>
            </Row>
            <SheetFilters
              :data="sheets.value"
              :filters="filters"
              @update="(f) => (filters.value = f || [])"
            />
          </Col>
        </Col>
        <Col gap="4" class="flex-1 max-w-4xl">
          <Row>
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20"
              height="20"
              viewBox="0 0 612 612"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M404.814,0H60.736v612h490.527V153L404.814,0z M402.979,79.292l83.433,81.913h-83.433V79.292L402.979,79.292z
                                    M497.102,554.625H114.898V57.375h237.719v155.788h144.484V554.625z"
                />
              </g>
            </svg>
            <Subtitle>your sheets</Subtitle>
          </Row>
          <Row class="font-light text-sm">
            <div class="flex-1">
              <div v-if="!filters.value || filters.value.length == 0">no filters</div>
              <div v-else>filters: {{ filters.value.join(', ') }}</div>
            </div>
            <Row class="w-auto">
              <div class="whitespace-nowrap">sheets per page</div>
              <Select
                @change="
                  (e: Event) => (pageLen = Number((e.target as HTMLSelectElement).value) || 10)
                "
                :value="pageLen"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </Select>
            </Row>
          </Row>
          <SheetsDisplay
            :sheets="sheets.value"
            :filters="filters.value || []"
            :page-len="pageLen"
          />
        </Col>
      </HomeLayout>
    </div>
  </div>
</template>
