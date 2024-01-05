import {useRef, Fragment} from "react";
import {useSearch, useSearchHistory} from "@/hooks";
import {findParentNodeByName} from "@/utils";
import {SearchButton, Form} from "@/components";

export function Search() {
  const {searchHistory, saveSearchHistory} = useSearchHistory();
  const {data, dispatch, query} = useSearch(searchHistory);
  const ulOfSuggestionsRef = useRef(null);
  const count = useRef(-1);

  return (
    <div className="relative">
      <Form className="flex bg-stone-900 border rounded-3xl overflow-hidden">
        <input
          className="bg-transparent w-full p-2 text-slate-200"
          type="text"
          onFocus={() => {
            if (ulOfSuggestionsRef.current) {
              ulOfSuggestionsRef.current.style.display = "block";
            }
          }}
          onBlur={() => {
            if (ulOfSuggestionsRef.current) {
              ulOfSuggestionsRef.current.style.display = "none";
            }
          }}
          onKeyUp={ev => {
            switch (ev.key) {
              case "ArrowUp":
                ulOfSuggestionsRef.current?.childNodes[
                  count.current
                ]?.classList.remove("bg-zinc-600");

                if (count.current >= 0) {
                  count.current -= 1;
                } else {
                  count.current = data.length - 1;
                }

                if (count.current === -1) {
                  return (ev.target.value = query);
                }

                ev.preventDefault();
                ev.target.value = data[count.current];
                ulOfSuggestionsRef.current?.childNodes[
                  count.current
                ]?.classList.add("bg-zinc-600");
                break;
              case "ArrowDown":
                ulOfSuggestionsRef.current?.childNodes[
                  count.current
                ]?.classList.remove("bg-zinc-600");

                if (count.current < data.length - 1) {
                  count.current += 1;
                } else {
                  count.current = -1;
                  return (ev.target.value = query);
                }

                ev.preventDefault();
                ev.target.value = data[count.current];
                ulOfSuggestionsRef.current?.childNodes[
                  count.current
                ]?.classList.add("bg-zinc-600");
                break;
              case "Enter":
                ulOfSuggestionsRef.current?.childNodes[
                  count.current
                ]?.classList.remove("bg-zinc-600");

                if (count.current !== -1) {
                  dispatch(data[count.current]);
                  saveSearchHistory(data[count.current]);
                } else {
                  dispatch(query);
                  saveSearchHistory(query);
                }

                count.current = -1;
            }
          }}
          onChange={ev => {
            dispatch(ev.target.value);
          }}
          value={query}
          placeholder="Search"
        />
        <SearchButton onClick={() => saveSearchHistory(query)} />
      </Form>
      <ul
        className="absolute w-1/2 bg-neutral-800 text-slate-200 left-2/4 -translate-x-2/4 rounded-xl py-4 hidden overflow-hidden"
        ref={ulOfSuggestionsRef}
        onClick={ev => {
          const ul = findParentNodeByName(ev.target, "UL");
          if (ul) ul.style.display = "none";
          ulOfSuggestionsRef.current = ul;
          if (ev.target.nodeName !== "UL") {
            dispatch(ev.target.innerText);
            saveSearchHistory(ev.target.innerText);
          }
        }}
        onMouseOver={ev => {
          if (ev.target.nodeName !== "UL") {
            const li = findParentNodeByName(ev.target, "LI");
            li.classList.add("bg-zinc-600");
          }
          ulOfSuggestionsRef.current?.childNodes[
            count.current
          ]?.classList.remove("bg-zinc-600");

          ulOfSuggestionsRef.current = null;
        }}
        onMouseOut={ev => {
          if (ev.target.nodeName !== "UL") {
            const li = findParentNodeByName(ev.target, "LI");
            li.classList.remove("bg-zinc-600");
          }
        }}
        onMouseLeave={ev => {
          const ul = findParentNodeByName(ev.target, "UL");
          if (ul) ulOfSuggestionsRef.current = ul;
        }}
      >
        {data?.map((suggestion, i) => (
          <Fragment key={i}>
            <li className="cursor-pointer">
              <div className="absolute pl-2">🔍</div>
              <div className="relative z-10 w-full px-10">{suggestion}</div>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Search;
