import Icon from "@/components/ui/icon";
import type { Input } from "@/services/psbt";

type Props = {
	inputs: Input[];
};

export default function Inputs({ inputs }: Props) {
	if (inputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg text-gray-50">
					<Icon name="input" /> <span>Inputs</span>
				</h2>
			</div>
			{/*<ul className="space-y-4">
        (Array.mapi
           (fun index (input : input) ->
             let txid = Converters.txid_of_uint8Array input.hash in
             <li key=(string_of_int index) className="rounded-xl bg-gray-950 flex flex-col">
               <div className="border-b border-gray-900/50 p-4">
                 <h3 className="text-candle">(string @@ "inputs[" ^ string_of_int index ^ "]")</h3>
               </div>
               <dl className="divide-y divide-gray-900/50">
                 <div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
                   <dt>(string "Previous TX ID")</dt>
                   <dd className="sm:col-span-3 font-mono">(string txid)</dd>
                 </div>
                 <div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
                   <dt>(string "Previous output index")</dt>
                   <dd className="sm:col-span-3">(string (string_of_int input.index))</dd>
                 </div>
                 (match input.sequence with
                  | Some s ->
                    <div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
                      <dt>(string "Sequence")</dt>
                      <dd className="sm:col-span-3 space-y-6">(string @@ string_of_int s)</dd>
                    </div>
                  | None -> null)
                 (match global_psbt with
                  | Some (g : 'a global_psbt) ->
                    if index < Array.length g.data.inputs
                    then (
                      let global_input = g.data.inputs.(index) in
                      match global_input.witnessScript with
                      | Some script ->
                        let asm = Script.toASM (Script.BufferChunks script) in
                        let script_type = Ops.get_script_type_from_asm asm in
                        let split = String.split_on_char ' ' asm in
                        <div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
                          <dt>(string "Script")</dt>
                          <dd className="sm:col-span-3 space-y-6">
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                              <div className="flex items-center space-x-1">
                                <Ui.Badge label=script_type />
                                <p className="text-xs">(string "witness script")</p>
                              </div>
                            </div>
                            <div className="space-y-1 flex flex-col">
                              (split
                               |> Array.of_list
                               |> Array.map (fun text -> <Script_text key=text text />)
                               |> React.array)
                            </div>
                          </dd>
                        </div>
                      | None -> null)
                    else null
                  | None -> null)
               </dl>
             </li>)
           inputs
         |> array)
      </ul>*/}
		</div>
	);
}
