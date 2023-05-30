import "styled-components";
import { blue } from "@radix-ui/colors/types/light/blue";
import { gray } from "@radix-ui/colors/types/light/gray";
import { indigo } from "@radix-ui/colors/types/light/indigo";
import { mauve } from "@radix-ui/colors/types/light/mauve";
import { plum } from "@radix-ui/colors/types/light/plum";
import { red } from "@radix-ui/colors/types/light/red";
import { slate } from "@radix-ui/colors/types/light/slate";
import { teal } from "@radix-ui/colors/types/light/teal";
import { violet } from "@radix-ui/colors/types/light/violet";

import { blue as blueDark } from "@radix-ui/colors/types/dark/blue";
import { gray as grayDark } from "@radix-ui/colors/types/dark/gray";
import { indigo as indigoDark } from "@radix-ui/colors/types/dark/indigo";
import { mauve as mauveDark } from "@radix-ui/colors/types/dark/mauve";
import { plum as plumDark } from "@radix-ui/colors/types/dark/plum";
import { red as redDark } from "@radix-ui/colors/types/dark/red";
import { slate as slateDark } from "@radix-ui/colors/types/dark/slate";
import { teal as tealDark } from "@radix-ui/colors/types/dark/teal";
import { violet as violetDark } from "@radix-ui/colors/types/dark/violet";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: any;
    title: string;
  }
}
