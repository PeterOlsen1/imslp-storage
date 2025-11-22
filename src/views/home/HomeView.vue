<script setup lang="ts">
import { Col, HomeLayout, Row } from '@/components/layouts'
import { useCurrentUser, useCollection } from 'vuefire'
import { getUserSheetsCollection } from '@/scripts/db'
import { watchEffect, ref, toValue, onMounted, onUnmounted } from 'vue'
import type { Filter } from '@/types/filter'
import type { Sheet } from '@/types/sheet'
import { Select } from '@/components/lib/inputs'
import { Title, Subtitle } from '@/components/ui'
import { AddSheetForm, SheetFilters, SheetsDisplay } from './components'
import { Arrow } from '@/components/lib/svg'

const user = useCurrentUser()
const sheets = ref<Sheet[]>([])

watchEffect(() => {
  if (user.value?.uid) {
    sheets.value = useCollection(getUserSheetsCollection(user.value.uid)) as any
  } else {
    sheets.value = []
  }
})

function handleWindowResize() {
  if (window.innerWidth > 640) {
    formExpanded.value = true
    filtersExpanded.value = true
  }
}

onMounted(() => {
  if (window.innerWidth > 640) {
    formExpanded.value = true
    filtersExpanded.value = true
  }
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

const formExpanded = ref<boolean>(false)
function expandForm() {
  formExpanded.value = !formExpanded.value
}

const filtersExpanded = ref<boolean>(false)
function expandFilters() {
  filtersExpanded.value = !filtersExpanded.value
}

const filters = ref<Filter[]>([])
const pageLen = ref<number>(10)
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col align-center overflow-x-hidden">
    <div class="mt-16 mx-8 md:ml-8">
      <Title class="mb-12">
        welcome back{{ user ? ', ' + user.displayName?.split(' ')[0] + '!' : '!' }}
      </Title>
      <div></div>
      <HomeLayout class="mb-6">
        <Col gap="4" class="sm:min-w-48">
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
              <div class="flex-1 flex justify-end sm:hidden">
                <Arrow
                  :class="`${formExpanded ? 'rotate-270' : 'rotate-90'} cursor-pointer transition-transform duration-200`"
                  @click="expandForm"
                />
              </div>
            </Row>
            <AddSheetForm :class="`${formExpanded ? 'h-auto' : 'h-0 hidden'}`" />
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
              <div class="flex-1 flex justify-end sm:hidden">
                <Arrow
                  :class="`${filtersExpanded ? 'rotate-270' : 'rotate-90'} cursor-pointer transition-transform duration-200`"
                  @click="expandFilters"
                />
              </div>
            </Row>
            <!-- can't apply the class to sheetFilters directly, wrap it in col -->
            <Col :class="filtersExpanded ? 'h-auto' : 'h-0 hidden'">
              <SheetFilters
                :data="toValue(sheets)"
                :filters="filters"
                @update="(f) => (filters = f || [])"
              />
            </Col>
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
              <div v-if="!filters || filters.length == 0">no filters</div>
              <div v-else>filters: {{ filters.map((f) => f.label).join(', ') }}</div>
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
            :sheets="toValue(sheets)"
            :filters="filters.map((f) => f.label) || []"
            :page-len="pageLen"
            class="ml-[-2rem] sm:ml-0"
          />
        </Col>
      </HomeLayout>
    </div>
  </div>
</template>
