import { AppState } from '@/ui_models/app_state';
import VisuallyHidden from '@reach/visually-hidden';
import { toDirective, useAutorunValue } from './utils';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';
import MoreIcon from '../../icons/ic_more.svg';
import NotesIcon from '../../icons/il_notes.svg';
import { useRef, useState } from 'preact/hooks';
import { Switch } from './Switch';

type Props = { appState: AppState; onViewNote: () => void };

function MultipleSelectedNotes({ appState }: Props) {
  const count = useAutorunValue(() => appState.notes.selectedNotesCount, [
    appState.notes,
  ]);
  const [open, setOpen] = useState(false);
  const [optionsPanelPosition, setOptionsPanelPosition] = useState({
    top: 0,
    right: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>();
  const panelRef = useRef<HTMLDivElement>();

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex items-center justify-between p-4 w-full">
        <h1 className="text-3xl m-0">{count} selected notes</h1>
        <Disclosure
          open={open}
          onChange={() => {
            const rect = buttonRef.current.getBoundingClientRect();
            setOptionsPanelPosition({
              top: rect.bottom,
              right: document.body.clientWidth - rect.right,
            });
            setOpen((prevOpen) => !prevOpen);
          }}
        >
          <DisclosureButton
            ref={buttonRef}
            className="bg-transparent cursor-pointer w-32px h-32px rounded-full p-0 flex justify-center items-center border-1 justify-center border-solid border-gray-300"
          >
            <VisuallyHidden>Actions</VisuallyHidden>
            <MoreIcon className="fill-current block" />
          </DisclosureButton>
          <DisclosurePanel
            ref={panelRef}
            style={{
              ...optionsPanelPosition,
            }}
            className="sn-dropdown sn-dropdown-anchor-right grid gap-2 py-2 select-none"
          >
            <Switch onChange={() => {}}>
              <p className="capitalize">Prevent editing</p>
            </Switch>
            <Switch onChange={() => {}}>
              <p className="capitalize">Show preview</p>
            </Switch>
            {/* <span className="w-full bg-contrast" style={{ height: 1 }}></span>
        <p className="capitalize">Add tag</p>
        <p className="capitalize">Pin notes</p>
        <p className="capitalize">Archive</p>
        <p className="capitalize">Move to Trash</p> */}
          </DisclosurePanel>
        </Disclosure>
      </div>
      <div className="flex flex-grow flex-col justify-center items-center w-full max-w-md">
        <NotesIcon className="block" />
        <h2 className="text-2xl m-0 text-center mt-4">
          {count} selected notes
        </h2>
        <p className="text-lg mt-2 text-center">
          Actions will be performed on all selected notes.
        </p>
      </div>
    </div>
  );
}

export const MultipleSelectedNotesDirective = toDirective<Props>(
  MultipleSelectedNotes
);
