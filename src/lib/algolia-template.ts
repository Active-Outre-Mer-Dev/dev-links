export function item(hit: any) {
  return `
    <div class="first-of-type:mt-4 mb-4">
      <div class="hit-content">
        <div>
          <p class="text-xl mb-1">${hit?._highlightResult?.label.value}</p>
         <a href="${hit.href}" class="text-neutral-300" target="_blank">${hit.href}</a>
        </div>
      </div>
    </div>
  `;
}
